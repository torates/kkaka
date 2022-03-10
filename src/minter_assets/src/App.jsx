import React, {useState} from "react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Mint } from "./Mint"
import { Home } from "./Home"
import { About } from "./About"
import { Nav } from "./Nav"
import { Check } from "./checker/Check"
import {styles} from "./styles"

function App() {
  return (
    <home style={styles.column}>
      <div style={styles.navbar}>
        <Nav />
      </div>
      <div style={styles.app} className="App">
        <Home />
        <BrowserRouter>
          <Switch>
            <Route path="/check">
              <Check />            
            </Route>
            <Route path="/mint">
              <Mint />            
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <div style={styles.foot}>
        <About />
      </div>
    </home>
  )
}

export default App
