import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import { generatePalette } from './colorHelpers'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Palettelist from './Palettelist'


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
          <Route exact  path='/' render={()=><Palettelist palettes={seedColors}/>} />
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
