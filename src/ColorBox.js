import React,{Component} from 'react'
import chroma from 'chroma-js'
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { withStyles } from "@material-ui/styles";
import './ColorBox.css'

const styles = {
    ColorBox: {
      width: "20%",
      height: props => (props.showingFullPalette ? "25%" : "50%"),
      margin: "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      "&:hover button": {
        opacity: 1
      }
    },
    copyText: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
      color: props =>
        chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
      background: "rgba(255, 255, 255, 0.3)",
      position: "absolute",
      border: "none",
      right: "0px",
      bottom: "0px",
      width: "60px",
      height: "30px",
      textAlign: "center",
      lineHeight: "30px",
      textTransform: "uppercase"
    },
    copyButton: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
      opacity: 0
    }
  };
  

class ColorBox extends Component{
    state={
        copied: false
    }

    changeCOpyState = ()=>{
        this.setState({copied:true},()=>{
            setTimeout(()=>this.setState({copied:false}),1500)
        })
    }
    render(){
        let style = {
            background : this.props.background
        }
        // isDarkColor will be either true or false
        const isDarkColor = chroma(this.props.background).luminance() <= 0.08
        const isLightColor = chroma(this.props.background).luminance() >= 0.7

        const name = this.props.name
        const {copied} = this.state
        return(
            <CopyToClipboard text={this.props.background} onCopy={this.changeCOpyState}>
                <div className={this.props.classes.ColorBox} style={style}>
                    {/* if this.state.copied is true: add the class show else just the overlsy class */}
                <div className={`copy-overlay ${copied && 'show'}`} style={style}/>
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p className={this.props.classes.copyText}>{this.props.background}</p>
                </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={this.props.classes.colorName}>
                                {name}
                                {/* { chroma(this.props.background).luminance()} */}
                                
                            </span>
                        </div>
                        <button className={this.props.classes.copyButton}>Copy</button>
                    </div>
                    {/* stopPropagation prevents propagation of the same event from being called */}
                    {/* stops further events from happing */}
                    {this.props.showingFullPalette && (
                        <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e=>e.stopPropagation()}>
                            <span className={this.props.classes.seeMore}>More</span>
                        </Link>) }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox)