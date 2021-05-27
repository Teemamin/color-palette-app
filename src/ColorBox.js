import React,{Component} from 'react'
import './ColorBox.css'

class ColorBox extends Component{


    render(){
        let style = {
            background : this.props.background
        }
        return(
            <div className='ColorBox' style={style}>
                <span>{this.props.name}</span>

                <span>More</span>
            </div>
        )
    }
}

export default ColorBox