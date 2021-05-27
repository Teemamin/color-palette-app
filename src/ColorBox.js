import React,{Component} from 'react'
import './ColorBox.css'

class ColorBox extends Component{


    render(){
        let style = {
            background : this.props.background
        }
        const name = this.props.name
        return(
            <div className='ColorBox' style={style}>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{name}</span>
                    </div>
                    <button className='copy-button'>Copy</button>
                </div>
                <span className='see-more'>More</span>
            </div>
        )
    }
}

export default ColorBox