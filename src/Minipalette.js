import React,{PureComponent} from 'react'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import styles from './styles/MiniPaletteStyles'
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from '@material-ui/core/styles';

class Minipalette extends PureComponent{

    deletePalette=(e)=> {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
      }

    render(){
        const {classes,paletteName,emoji,colors} = this.props;
        const miniColorBoxes = colors.map(color=>(
        <div className={classes.miniColor} style={{backgroundColor:color.color}} key={color.name}
        ></div>))
        return (
            <div className={classes.root} onClick={()=>this.props.handleClick(this.props.id)}>
                
                    <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onClick={this.deletePalette}
                    />
                <div className={classes.colors}>
                    {/* Mini color boxes */}
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
}
}

//to apply the material UI styles you'll need to export the component like below
// higher order component
//withstyles passes the props classes to our function
export default withStyles(styles)(Minipalette)