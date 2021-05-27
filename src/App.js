import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'

class App extends Component {

  render(){
      return (
        <div className="">
          <Palette {...seedColors}/>
        </div>
      );
    }
}

export default App;
