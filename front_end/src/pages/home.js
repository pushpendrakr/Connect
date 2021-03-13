import React, { Component } from 'react'
import axios from 'axios'
import {Grid,Typography,withStyles} from '@material-ui/core'
import Postcard from '../components/Postcard.js'
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import {getScreams} from '../redux/actions/dataaction.js'
 class home extends Component {
 state={
  posts:null
 }

  componentDidMount(){
  this.props.getScreams();
  }
 
    render() {
      
        const{posts}=this.props.data;
        let x=posts?posts.map(p1=>
           
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

const mapStateToProps=(state)=>({
    data:state.data,
    });

const mapActionsToProps={
    getScreams
}

export default connect(mapStateToProps,mapActionsToProps)((home));

