import React,{Component} from 'react'
import ColorBox from './ColorBox'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css'
import Navbar from './Navbar'

class Palette extends Component{

    state = {
        level : 500,
        format : 'hex'
    }
    changeLevel = (newLevel)=>{
        this.setState({level:newLevel})
    }
    changeFormat =(val)=>{
        this.setState({format: val})
    }
    render(){
        const {colors,paletteName,emoji,id} = this.props.palette
        const {level,format} = this.state
        const colorBoxes = colors[level].map(
            color=><ColorBox background={color[format]} name={color.name} 
            id ={color.id}
            key={color.id}
            paletteId ={id} 
         />)
        return(
            <div className='Palette'>
                {/* Nabar goes here*/}
               <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className='Palette-colors'>
                     {/* bunch of color goes here*/}
                     {colorBoxes}
                </div>
                {/* Footer goes here*/}
                <footer className='Palette-footer'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Palette