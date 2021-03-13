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
export class App extends Component {
 constructor(){
   super()
   this.state={
     isLoggedin:false,
   }
 }
 componentWillReceiveProps(nextProps){
  this.setState({
      isLoggedin:nextProps.user.authenticated
  })   
}
// componentDidMount(){
//   axios.get('/api/isLoggedIn')
//   .then(res=>{
//     this.setStateisLoggedin:true
//   })
// }
 render() {
    const x=(this.state.isLoggedin);
    const y=(this.state.isLoggedin);
    return (
      
      <div className="container">
        <Router>
          <Navbar/>
          <Switch> 
           <Authroute exact path='/login' component={login}></Authroute>
          <Authroute exact path='/signup' component={signup}></Authroute>
            <Route exact path='/' component={home}></Route>
          </Switch>
        </Router>
      </div>
  )}}

const mapStateToProps=(state)=>({
  user:state.user,
});


export default connect(mapStateToProps)(App);
