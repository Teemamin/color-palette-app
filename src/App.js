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
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page"
import "./App.css";

const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));


class App extends Component {
  state={
    palettes: savedPalettes || seedColors
  }


  findPallete = (id)=>{
    return this.state.palettes.find(palette=>{
       return palette.id === id
    })

  }

  deletePalette=(id)=> {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }

  savePalette = (newPalette)=>{
    // console.log(newPalette)
    this.setState({palettes:[...this.state.palettes,newPalette]},this.syncLocalStorage)
  }

  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  render(){
    // console.log(generatePalette(seedColors[3]))
      return (
        <Route render={({location})=>(
          <TransitionGroup>
             <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
              <Route exact path='/palette/new'
                render={(routeProps)=>
                  <Page>
                     <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes}/>
                  </Page>
                } 
              />
              <Route exact  path='/palette/:paletteId/:colorId' 
                render={(routeProps)=>
                  <Page>
                    <SingleColorPalette 
                      colorId ={routeProps.match.params.colorId}
                      palette={generatePalette(this.findPallete(routeProps.match.params.paletteId))}
                    />
                  </Page>
                  } 
              /> 
              <Route exact  path='/' render={(routeProps)=>(
               <Page>
                  <Palettelist palettes={this.state.palettes}
                  deletePalette={this.deletePalette}
                  {...routeProps}/>
                </Page>
              )} />
    
              <Route exact  path='/palette/:id' 
              render={(routeProps)=>
                <Page>
                  <Palette palette={generatePalette(this.findPallete(routeProps.match.params.id))}/>
                </Page>} 
              
            />
              <Route render={(routeProps)=>(
                // this route wil ensure a user is always redirected to palette list if they
                // try access some unspecified url path (like 404)
               <Page>
                  <Palettelist palettes={this.state.palettes}
                  deletePalette={this.deletePalette}
                  {...routeProps}/>
                </Page>
              )} />
            </Switch>
           </CSSTransition>
         </TransitionGroup>
        )}/>
  
        // <div className="">
        //   <Palette palette={generatePalette(seedColors[3])}/>
        // </div>
      );
    }
}

export default App;
