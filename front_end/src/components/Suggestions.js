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
        //backgroundColor: theme.palette.background.paper,
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
       this.props.followuser(this.props.User._id);
       this.setState({followed:true})
   }
 
    
    render() {
      //  console.log(this.props)
        console.log(this.state)
        const {classes}=this.props
     let p1=null;
      if(this.state.followed)
      p1=<Button variant='contained' color='primary' style={{position:'absolute',left:'80%'}} disable onClick={this.followhandler}>Follow</Button>
      else 
      p1=<Button variant='contained' color='primary' style={{position:'absolute',left:'80%'}} onClick={this.followhandler}>Follow</Button>

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
