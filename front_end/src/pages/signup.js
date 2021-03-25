import React, { Component } from 'react'
import {Button,Grid,withStyles,TextField, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import axios from 'axios'
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/useraction.js'

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

class signup extends Component {

    constructor(){
        super();
    this.state={
        username:'',
        password:'',
        email:'',
        
         error:''
    }
    }
    componentWillReceiveProps(nextProps){
      
        if(nextProps.UI.errors){
            this.setState({
                error:nextProps.UI.errors
            })
 
        }
    }
    handleSubmit=(e)=>{
     
        e.preventDefault();
      const userdata={
          username:this.state.username,
          password:this.state.password,
          email:this.state.email
      }

      this.props.signupUser(userdata,this.props.history);

      
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {  
        const {classes,UI}=this.props;
        
        return (
            
                <Grid container className={classes.form}>
                <Grid item sm/>
                
                <Grid item sm>
                <Typography  variant="h3" className={classes.pageTitle}>SignUp</Typography>
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <TextField variant='outlined'className={classes.textField} type='username'value={this.state.username} name='username' id='username' label='Username' helperText={this.state.error} error={this.state.error?true:false}  onChange={this.handleChange}fullWidth/>
                    <TextField variant='outlined' className={classes.textField} type='password'value={this.state.password} name='password'id='password' label='Password' onChange={this.handleChange}fullWidth/>
                    
                    <TextField variant='outlined'className={classes.textField} type='email'value={this.state.email} name='email'id='email' label='Email' onChange={this.handleChange}fullWidth/>

                    <Button variant='contained'type='submit'className={classes.button}color="primary">Submit</Button>
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
    signupUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(signup));
