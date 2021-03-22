import React, { Component } from 'react'
import axios from 'axios'
import {Grid,Typography,withStyles,Paper} from '@material-ui/core'
import Postcard from '../components/Postcard.js'
import Suggestions from '../components/Suggestions.js'
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import {getUserdata} from '../redux/actions/useraction.js'
 class home extends Component {
  componentDidMount(){
    
  this.props.getUserdata();
  }
 
    render() {
      // console.log(this.props)
        const{posts}=this.props.data;
        console.log(posts)
        const {suggestedusers}=this.props.user
       
        let x=posts?posts.map(p1=>
           
            <Postcard Posts={p1}/>         

        ):<p>Loading...</p>
        let cnt=0;
        let v=suggestedusers?suggestedusers.slice(0,5):null
        let y=v?v.map(p2=>
           (<Suggestions User={p2}/>)
           
          ):null

        return (
            <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {x}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
          <br/>
          <Typography variant='h5'>Suggestions for you</Typography>
          <Paper>
         {y}
          </Paper>
        </Grid>
      </Grid>
        )
    }
}

const mapStateToProps=(state)=>({
    data:state.data,
    user:state.user

    });

const mapActionsToProps={
    getUserdata
}

export default connect(mapStateToProps,mapActionsToProps)((home));

