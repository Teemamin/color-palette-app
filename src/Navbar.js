import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from './styles/NavbarStyles'
// import "./Navbar.css";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";


class Navbar extends Component {
    state ={
        format : 'hex',
        open : false
    }

    handleChange =(e)=>{
        this.setState({format:e.target.value, open:true})
        this.props.handleChange(e.target.value)
    }
    closeSnackbar = ()=>{
        this.setState({open:false})
    }
    render(){
        const {level,changeLevel,classes} = this.props
        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>Color Picker</Link>
                </div>
                {this.props.showingAllColors && (
                <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider defaultValue={level}
                        min={100} max={900}
                        step={100}
                        onAfterChange={changeLevel} //it will call changeLvel wenevr the slider value chngs and pass on the new val
                        /> 
                    </div>
                </div>)}
               <div className={classes.selectContainer}>
                   <Select value={this.state.format} onChange={this.handleChange}>
                       <MenuItem value='hex'>hex -#ffff</MenuItem>
                       <MenuItem value='rgb'>rgb =--rgb(10,255,324)</MenuItem>
                       <MenuItem value='rgba'>rgba =--rgba(10,255,324,1.0)</MenuItem>
                   </Select>
               </div>
               <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format changed to {this.state.format}</span>}
                    ContentProps={{
                        "aria-describedby": 'message-id'
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit'>
                            <CloseIcon />
                        </IconButton>
                    ]

                    }
                    
                />
            </header>
        )
    }
}
export default withStyles(styles)(Navbar)