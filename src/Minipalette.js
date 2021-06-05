import React from 'react'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';


const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          cursor: "pointer"
        }
      },
    colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
      },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
      },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
      },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
      }

}

function Minipalette(props){
    const {classes,paletteName,emoji,colors} = props;
    // console.log(classes)
    const miniColorBoxes = colors.map(color=>(
    <div className={classes.miniColor} style={{backgroundColor:color.color}} key={color.name}
    ></div>))
    return (
        <div className={classes.root}>
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