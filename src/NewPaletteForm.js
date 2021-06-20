import React,{Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggerableColorBoxes from './DraggerableColorBoxes'
import DraggerableColorList from './DraggerableColorList'
import PaletteFormNav from './PaletteFormNav'
import { arrayMove } from "react-sortable-hoc";
import { ChromePicker } from 'react-color';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class NewPaletteForm extends Component {
  static defaultProps ={
    maxColors : 20
  }
    state = {
        open: true,
        currentColor : 'green',
        colors : this.props.palettes[0].colors,//to have a starter palette displayed
        newColorName : ''
      };

    componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
            //value will be whtvr is in the validtr input filed
            //every() method tests whether all elements in the array "name" is not thesame as the passed value
            // every() returns a boolean 
            this.state.colors.every(
                ({name})=> name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.state.colors.every(
                ({color})=> color !== this.state.currentColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
            this.props.palettes.every(
                ({paletteName})=> paletteName.toLowerCase() !== value.toLocaleLowerCase()
            )
        );

    }
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      handleUpdateCurrentColor = (newColor)=>{
        this.setState({currentColor:newColor.hex})
      }

      handleAddNewColor = ()=>{
        const newColor = {
            color : this.state.currentColor,
            name : this.state.newColorName
        }
        this.setState({colors:[...this.state.colors,newColor],newColorName:''})
          
      }
      handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value });
        }

     handleSubmit = (newPaletteName) => {
        const newPalette = {
            paletteName : newPaletteName,
            id : newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
            colors : this.state.colors
        }
        this.props.savePalette(newPalette)
        //will redirect to /
        this.props.history.push('/')
        }
      removeColor = (colorName)=>{
        this.setState({
          colors : this.state.colors.filter(color=> color.name !== colorName)
        })
      }
      clearColors = ()=>{
        this.setState({colors: []})
      }
      addRandomColor = ()=>{
        //pick random color from exisiting palettes
        const allColors = this.props.palettes.map(p=>p.colors).flat()
        let rand = Math.floor(Math.random()*allColors.length)
        let randomColor = allColors[rand]
        this.setState({colors:[...this.state.colors,randomColor]})
        // console.log(randomColor)
        // console.log(allColors)

      }
      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          //arrayMove is a method that comes with the dragerable package
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      };
      render() {
        const { classes, theme, maxColors,palettes } = this.props;
        const { open,newColorName,newPaletteName,colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;
        return (
          <div className={classes.root}>
           <PaletteFormNav classes={classes} open={this.state.open} palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                   <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <Typography variant='h5'>Design Your Color picker</Typography>
              
              <div>
                <Button variant="contained" color="secondary" onClick={this.clearColors}>Clear Palette</Button>
                <Button variant="contained" color="primary"
                  onClick={this.addRandomColor}
                  disabled={paletteIsFull}
                >Random color</Button>
             </div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={(newColor)=>this.handleUpdateCurrentColor(newColor)}/>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleAddNewColor}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        onChange={this.handleChange}
                        name="newColorName"
                        value={newColorName}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={
                            ['this field is required', 'Color name must be unique','color already used']}
                    />
                    <Button variant="contained" color="primary" 
                    style={{backgroundColor: paletteIsFull? 'grey' : this.state.currentColor}}
                    type='submit'
                    disabled={paletteIsFull}>
                       {paletteIsFull ? 'Palette is full ' : 'Add color' }
                
                </Button>
                </ValidatorForm>
                

            
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <DraggerableColorList 
                colors={this.state.colors}
                removeColor={this.removeColor} 
                axis='xy'
                onSortEnd={this.onSortEnd}
              />
            </main>
          </div>
        );
      }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);
