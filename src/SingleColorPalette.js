import React,{Component} from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import {Link} from 'react-router-dom'

class SingleColorPalette extends Component{
    constructor(props) {
        super(props);
        //_shades is addded to the isntance of the class
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state ={
            format: 'hex'
        }
      }
      gatherShades(palette, colorToFilterBy) {
        //find the color that mtchs the color id
        //return all shades of given color
        let shades = [];
        let allColors = palette.colors;
    
        for (let key in allColors) {
          shades = shades.concat(
            allColors[key].filter(color => color.id === colorToFilterBy)
          );
        }
        //return all shades of given color
        // ued sliced to remove livid 50,the color is white
        return shades.slice(1);
      }
    changeFormat =(val)=>{
        this.setState({format: val})
    }
      render() {
        const {format} = this.state
        const { paletteName, emoji } = this.props.palette;
        const colorBoxes = this._shades.map(color => (
          <ColorBox
            key={color.name}
            name={color.name}
            background={color[format]}
            showingFullPalette={false}
          />
        ));
        return (
          <div className='SingleColorPalette Palette'>
            <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
            <div className='Palette-colors'>
                {colorBoxes}
                <div className='go-back ColorBox'>
                <Link to={`/palette/${this.props.palette.id}`} className='back-button'>
                    GO BACK
                </Link>
                </div>
            
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
          </div>
        );
    }
}

export default SingleColorPalette