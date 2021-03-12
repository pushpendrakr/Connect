import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import './App.css'
import login from './pages/login'
import signup from './pages/signup'
import home from './pages/home'
import axios from 'axios'
import Navbar from './components/navbar'
import {Provider} from 'react-redux'
import store from './redux/store'
export class App extends Component {
 constructor(){
   super()
   this.state={
     isLoggedin:false,
   }
 }
 componentDidMount(){
  axios.get('/api/isLoggedIn')
  .then(res=>{
      this.setState({
        isLoggedin:false
      })
  })

}

  render() {
    const x=(this.state.isLoggedin)?home:login;
    const y=(this.state.isLoggedin)?home:signup;
    return (
      <Provider store={store}>
      <div className="container">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/login' component={x} ></Route>
            <Route exact path='/signup' component={y}></Route>
            <Route exact path='/' component={home}></Route>

          </Switch>
        </Router>
      </div>
      </Provider>
    )
  }
}

export default App
