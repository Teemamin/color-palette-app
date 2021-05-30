import React,{Component} from 'react'
import ColorBox from './ColorBox'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css'
import Navbar from './Navbar'

class Palette extends Component{

    state = {
        level : 500
    }
    changeLevel = (newLevel)=>{
        this.setState({level:newLevel})
    }
    render(){
        const {colors} = this.props.palette
        const {level} = this.state
        const colorBoxes = colors[level].map(
            color=><ColorBox background={color.hex} name={color.name}/>)
        return(
            <div className='Palette'>
                {/* Nabar goes here*/}
               <Navbar level={level} changeLevel={this.changeLevel}/>
                <div className='Palette-colors'>
                     {/* bunch of color goes here*/}
                     {colorBoxes}
                </div>
                {/* Footer goes here*/}
            </div>
        )
    }
}

export default Palette