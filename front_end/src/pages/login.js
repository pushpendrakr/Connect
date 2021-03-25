import React, { Component } from 'react'
import {Button,Grid,withStyles,TextField, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import axios from 'axios'
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/useraction.js'



const styles={
    form:{
        textAlign:'center'
    },
    pageTitle:{
        margin:'10px auto 10px auto'
    },
    textField:{
        margin:'10px auto 10px auto'
    },
    button:{
        marginTop:'20px'
    }
}

class login extends Component {

    constructor(){
        super();
    this.state={
        username:'',
        password:'',
        
        error:{}
    }
    }
   componentWillReceiveProps(nextProps){
           this.setState({
               error:nextProps.UI.errors
           })   
   }
   
    handleSubmit=(e)=>{
     
        e.preventDefault();
      const userdata={
          username:this.state.username,
          password:this.state.password
      }
      this.props.loginUser(userdata,this.props.history);
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {  
        const {classes,UI}=this.props;
       
        let x=false,y=false,x1=null,y1=null;
        if(this.state.error){
            if(this.state.error.username)x=true;
            if(this.state.error.password)y=true;
        }
       if(x){x1=this.state.error.username}
       if(y){y1=this.state.error.password}
       
        return (
            
                <Grid container className={classes.form}>
                <Grid item sm/>
                
                <Grid item sm>
                <Typography  variant="h3" className={classes.pageTitle}>Login</Typography>
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <TextField variant="outlined" className={classes.textField}type='username'value={this.state.username} name='username' id='username' label='Username' helperText={x1} error={x  }onChange={this.handleChange}fullWidth/>
                    <TextField variant="outlined"className={classes.textField}type='password'value={this.state.password} name='password'id='password' label='Password' helperText={y1} error={y}onChange={this.handleChange}fullWidth/>
                    <Button variant='contained' color='primary'type='submit'className={classes.button}>Submit</Button>
                 </form>   
                </Grid>
                
                <Grid item sm/>
                </Grid>
             
        )
    }
}
const mapStateToProps=(state)=>({
    user:state.user,
    UI:state.ui
});

const mapActionsToProps={
    loginUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login));
