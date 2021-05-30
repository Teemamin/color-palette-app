import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import { generatePalette } from './colorHelpers'

class App extends Component {

  render(){
    console.log(generatePalette(seedColors[3]))
      return (
        <div className="">
          <Palette {...seedColors[3]}/>
        </div>
      );
    }
}

export default App;
