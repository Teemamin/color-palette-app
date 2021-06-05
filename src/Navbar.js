import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
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
        const {level,changeLevel} = this.props
        return(
            <header className='Navbar'>
                <div className='logo'>
                    <Link to='/'>Color Picker</Link>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider defaultValue={level}
                        min={100} max={900}
                        step={100}
                        onAfterChange={changeLevel} //it will call changeLvel wenevr the slider value chngs and pass on the new val
                        /> 
                    </div>
                </div>
               <div className='select-container'>
                   <Select value={this.state.format} onChange={this.handleChange}>
                       <MenuItem value='hex'>hex -#ffff</MenuItem>
                       <MenuItem value='rgb'>rgb =--rgb(10,255,324)</MenuItem>
                       <MenuItem value='rgba'>rgb =--rgba(10,255,324,1.0)</MenuItem>
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
export default Navbar