import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import {Redirect} from 'react-router-dom'
import './App.css'
import login from './pages/login'
import signup from './pages/signup'
import home from './pages/home'
import axios from 'axios'
import Navbar from './components/navbar'
import {Provider} from 'react-redux'
import store from './redux/store'
import {connect} from 'react-redux';
import Authroute from './components/Authroutes'
import post1 from './pages/post1'
import user from './pages/user1'
import pic from './components/pic'
import edit from './components/edit.js'
import searchuser from './pages/searchuser'
import followers from './pages/followers'
import following from './pages/following'
export class App extends Component {
 constructor(){
   super()
   this.state={
     isLoggedin:false,
     user:null,
   }
 }
 componentWillReceiveProps(nextProps){
  // console.log(nextProps)
  this.setState({
      isLoggedin:nextProps.user.authenticated,
      user:nextProps.user.username,

  })   
}

 render() {
    const x=(this.state.isLoggedin);
    const y=(this.state.user);
    return (
      
      <div className="container">
        <Router>
          <Navbar isLoggedin={this.state.isLoggedin} username={this.state.user}/>
          <Switch> 
           <Authroute exact path='/login' component={login}></Authroute>
          <Authroute exact path='/signup' component={signup}></Authroute>
            <Route exact path='/' component={home}></Route>
            <Route exact path='/post/:post_id' component={post1}></Route>
            <Route exact path='/username/:username' component={user}></Route>
            <Route exact path='/uploadpic' component={pic}></Route>
            <Route exact path='/editprofile' component={edit}></Route>
            <Route exact path='/search/:username' component={searchuser}></Route>
            <Route exact path='/followers/:id' component={followers}></Route>
            <Route exact path='/following/:id' component={following}></Route>
          </Switch>
        </Router>
       
      </div>
  )}}

const mapStateToProps=(state)=>({
  user:state.user,
});


export default connect(mapStateToProps)(App);
