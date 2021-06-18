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
import { ChromePicker } from 'react-color';

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
    state = {
        open: true,
        currentColor : 'green',
        colors : ['yellow','#ED1616','blue'],
        newName : ''
      };
    
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
        this.setState({colors:[...this.state.colors,this.state.currentColor]})
          
      }
      handlenewNameChange = (event) => {
        const newName = event.target.value;
        this.setState({ newName });
        }

      handleSubmit = () => {
        // your submit logic
        }
    
      render() {
        const { classes, theme } = this.props;
        const { open,newName } = this.state;
    
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Persistent drawer
                </Typography>
              </Toolbar>
            </AppBar>
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
                <Button variant="contained" color="secondary">Clear Palette</Button>
                <Button variant="contained" color="primary">Random color</Button>
             </div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={(newColor)=>this.handleUpdateCurrentColor(newColor)}/>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="New Name"
                        onChange={this.handlenewNameChange}
                        name="newName"
                        value={newName}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <Button variant="contained" color="primary" 
                    style={{backgroundColor:this.state.currentColor}}
                    onClick={this.handleAddNewColor}
                    
                >
                    Add color
                </Button>
                </ValidatorForm>
                

            
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              
                  {this.state.colors.map(color=><DraggerableColorBoxes color={color}/>)}
            
            </main>
          </div>
        );
      }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);
