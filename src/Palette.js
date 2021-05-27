import React,{Component} from 'react'
import ColorBox from './ColorBox'
import './Palette.css'

class Palette extends Component{


    render(){
        const colors = this.props.colors.map(
            color=><ColorBox background={color.color} name={color.name}/>)
        return(
            <div className='Palette'>
                {/* Nabar goes here*/}
                <div className='Palette-colors'>
                     {/* bunch of color goes here*/}
                     {colors}
                </div>
                {/* Footer goes here*/}
            </div>
        )
    }
}

export default Palette