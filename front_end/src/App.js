import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import './App.css'
import login from './pages/login'
import signup from './pages/signup'
import home from './pages/home'

import Navbar from './components/navbar'

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/login' component={login} ></Route>
            <Route exact path='/signup' component={signup}></Route>
            <Route exact path='/' component={home}></Route>

          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
