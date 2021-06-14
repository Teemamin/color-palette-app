import React,{Component} from 'react'
import chroma from 'chroma-js'
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles'
import { withStyles } from "@material-ui/styles";

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
                <div className={`${this.props.classes.copyOverlay} ${copied && this.props.classes.showOverlay}`} style={style}/>
                <div className={`${this.props.classes.copyMessage} ${copied && this.props.classes.showMessage}`}>
                    <h1>Copied!</h1>
                    <p className={this.props.classes.copyText}>{this.props.background}</p>
                </div>
                    <div className='copy-container'>
                        <div className={this.props.classes.boxContent}>
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