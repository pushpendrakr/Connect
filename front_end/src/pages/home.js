import React, { Component } from 'react'
import axios from 'axios'
import {Grid,Typography,withStyles} from '@material-ui/core'
import Postcard from '../components/Postcard.js'
import Profile from '../components/Profile'
 class home extends Component {
 state={
  posts:null
 }

  componentDidMount(){
  axios.get('/api/getpost')
  .then(res=>{console.log(res.data)
      this.setState({
          posts:res.data
      })
  })
  }
 
    render() {
       
        let post=this.state.posts;
        let x=post?post.map(p1=>
           
            <Postcard Posts={p1}/>         

        ):<p>Loading...</p>
        
        return (
           <Grid container spacint={16}>
           <Grid item sm/>
           <Grid item sm={6} >
            {x}

           </Grid>
           <Grid item sm={4} xs={12}>
             <Profile/>
               </Grid>
               
           </Grid>
        )
    }
}

export default (home)
