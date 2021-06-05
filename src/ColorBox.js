import React,{Component} from 'react'
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './ColorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        const name = this.props.name
        const {copied} = this.state
        return(
            <CopyToClipboard text={this.props.background} onCopy={this.changeCOpyState}>
                <div className='ColorBox' style={style}>
                    {/* if this.state.copied is true: add the class show else just the overlsy class */}
                <div className={`copy-overlay ${copied && 'show'}`} style={style}/>
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p>{this.props.background}</p>
                </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    {/* stopPropagation prevents propagation of the same event from being called */}
                    {/* stops further events from happing */}
                    <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e=>e.stopPropagation()}>
                        <span className='see-more'>More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox