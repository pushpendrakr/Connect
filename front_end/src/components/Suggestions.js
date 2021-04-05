import React, { Component } from 'react'
import {Link} from 'react-router-dom/'
import {Card,withStyles,List,ListItem,Divider,ListItemText,ListItemAvatar,Avatar,Typography,Button} from '@material-ui/core'
import {ListItemLink} from './listlink'
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataaction';
import {followuser,unfollowuser} from '../redux/actions/useraction';
const styles={
    root: {
        width: '100%',
        maxWidth: '36ch',
      },
      inline: {
        display: 'inline',
      },
}
class Suggestions extends Component {
    state={
        followed:false,
    }
   
   followhandler=()=>{
   //  console.log(this.props.user._id+" "+this.props.User._id)
     if(this.props.user._id===this.props.User._id)
     return true;
    if(this.props.user.following&&this.props.user.following.find(p=>(p===this.props.User._id)))
    return true;
    return false;
   }
   followuser=()=>{
    // console.log(this.props.User._id)
      this.props.followuser(this.props.User._id)
   }
    
    render() {
        console.log(this.props)
        const {classes}=this.props
     let p1=null;

      p1=this.followhandler()?(<Button variant='contained' color='primary' style={{position:'absolute',left:'80%'}} disabled >Follow</Button>):
     (<Button variant='contained' color='primary' style={{position:'absolute',left:'80%'}} onClick={this.followuser}>Follow</Button>)

        return (
          
         
           
            <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`/${this.props.User.profilepic}`} />
              </ListItemAvatar>
              <Typography style={{color:'black'}} component={Link} to={`/username/${this.props.User.username}`}>{this.props.User.username}</Typography>
              {p1}
            </ListItem>
          
          </List>
          
        )
    }
}
 
const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user
  });
  export default connect(
    mapStateToProps,
    {followuser,unfollowuser}
  )(withStyles(styles)(Suggestions));
