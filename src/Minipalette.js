import React from 'react'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import styles from './styles/MiniPaletteStyles'
import { withStyles } from '@material-ui/core/styles';

function Minipalette(props){
    const {classes,paletteName,emoji,colors} = props;
    // console.log(classes)
    const miniColorBoxes = colors.map(color=>(
    <div className={classes.miniColor} style={{backgroundColor:color.color}} key={color.name}
    ></div>))
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {/* Mini color boxes */}
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

//to apply the material UI styles you'll need to export the component like below
// higher order component
//withstyles passes the props classes to our function
export default withStyles(styles)(Minipalette)