import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import { generatePalette } from './colorHelpers'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Minipalette from './Minipalette'
import styles from './styles/PalettelistStyles'
import { withStyles } from "@material-ui/styles";

class Palettelist extends Component {

    goToPalette = (id)=>{
        this.props.history.push(`/palette/${id}`)
    }
    render(){
      let foundColor = this.props.palettes.map(p=>(
          <Minipalette {...p} handleClick={()=>this.goToPalette(p.id)}
          handleDelete={this.props.deletePalette}
          key={p.id}
          id={p.id}
        />))

        return(
            <div className={this.props.classes.root}>
                <div className={this.props.classes.container}>
                    <nav className={this.props.classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={this.props.classes.palettes}>
                        {foundColor}
                    </div>
                </div>
                    
            </div>
        )
    }
}

export default withStyles(styles)(Palettelist)
