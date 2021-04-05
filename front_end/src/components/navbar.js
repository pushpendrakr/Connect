import React, { Component, Fragment } from 'react'

import Link from 'react-router-dom/Link'
import {AppBar,Toolbar,Button,withStyles,Paper} from '@material-ui/core'
import Addpost from '@material-ui/icons/Add'
import MyButton from './MyButton'
import Home from '@material-ui/icons/Home'
import Newpost from './Newpost'
import { logoutUser} from '../redux/actions/useraction';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import {InputBase,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Notifications from './notifications.js' 
import { connect } from 'react-redux';

import { getUserdata} from '../redux/actions/useraction';
import { Redirect } from 'react-router'

const styles={
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        marginLeft:1,
        flex: 1,
      },
      divider: {
        height: 28,
        margin: 4,
      },
}

class navbar extends Component {
   state={
     ready:false,
     user:null,
     user1:null
   }
   handlechange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
  })
  console.log(this.state)
  }

  handlesubmit=()=>{
    this.setState({
      ready:true,
      user1:this.state.user
    })
    this.props.getUserdata();

    // this.setState({
    //   user:'',
    // })
  }
    render() {
        const{user:{authenticated}}=this.props
    const {classes}=this.props
    
        return (
            <div>

                <AppBar>
               
                    <Toolbar>
                    {authenticated?(<Fragment>
                   <Newpost/>
                   <Link to='/'>
                   <MyButton tip='Home'>
                   <Home /></MyButton></Link>
                   <Notifications/>
                   
                   <Paper style={{marginLeft:'30em'}}> 
                       <InputBase
                       name='user'
                       value={this.state.user}
                 className={classes.input}
                 placeholder="Search User"
                 inputProps={{ 'aria-label': 'search user' }}
                 onChange={this.handlechange}
                 />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={this.handlesubmit}>
        <SearchIcon />
      </IconButton></Paper>
        
                  {this.state.ready&&(<Redirect to={`/search/${this.state.user}`}></Redirect>)}
                  </Fragment>):

                        (<Fragment>
                            <Button color="inherit" component={Link} to='/login'>
                               Login  
                                </Button>
                                <Button color="inherit" component={Link} to='/signup'> 
                                Signup
                                </Button>
                                <Button color="inherit" component={Link} to='/'>
                                Home
                                </Button>
                              
                                </Fragment>)

                        }
                        
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapActionsToProps = { logoutUser,getUserdata};

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(navbar));

