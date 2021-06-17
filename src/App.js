import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import NewPalette from './NewPaletteForm'
import { generatePalette } from './colorHelpers'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Palettelist from './Palettelist'
import SingleColorPalette from './SingleColorPalette'


class App extends Component {


  findPallete = (id)=>{
    return seedColors.find(palette=>{
       return palette.id === id
    })

  }
  render(){
    // console.log(generatePalette(seedColors[3]))
      return (
        <Switch>
         <Route exact path='/palette/new'
           render={()=>
             <NewPalette/>
           } 
          />
          <Route exact  path='/palette/:paletteId/:colorId' 
            render={(routeProps)=>
              <SingleColorPalette 
               colorId ={routeProps.match.params.colorId}
               palette={generatePalette(this.findPallete(routeProps.match.params.paletteId))}
              />} 
          /> 
          <Route exact  path='/' render={(routeProps)=><Palettelist palettes={seedColors} {...routeProps}/>} />

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
