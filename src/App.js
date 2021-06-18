import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Palettelist from './Palettelist'
import SingleColorPalette from './SingleColorPalette'


class App extends Component {
  state={
    palettes : seedColors
  }


  findPallete = (id)=>{
    return this.state.palettes.find(palette=>{
       return palette.id === id
    })

  }
  savePalette = (newPalette)=>{
    // console.log(newPalette)
    this.setState({palettes:[...this.state.palettes,newPalette]})
  }
  render(){
    // console.log(generatePalette(seedColors[3]))
      return (
        <Switch>
         <Route exact path='/palette/new'
           render={(routeProps)=>
             <NewPaletteForm savePalette={this.savePalette} {...routeProps}/>
           } 
          />
          <Route exact  path='/palette/:paletteId/:colorId' 
            render={(routeProps)=>
              <SingleColorPalette 
               colorId ={routeProps.match.params.colorId}
               palette={generatePalette(this.findPallete(routeProps.match.params.paletteId))}
              />} 
          /> 
          <Route exact  path='/' render={(routeProps)=><Palettelist palettes={this.state.palettes} {...routeProps}/>} />

          <Route exact  path='/palette/:id' 
          render={(routeProps)=>
          <Palette palette={generatePalette(this.findPallete(routeProps.match.params.id))}/>} 
        />

        </Switch>
        // <div className="">
        //   <Palette palette={generatePalette(seedColors[3])}/>
        // </div>
      );
    }
}

export default App;
