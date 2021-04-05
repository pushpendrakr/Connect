import React, { Component,Fragment} from 'react'
import Link from 'react-router-dom/Link'
import {CardActions, TextField, Typography,Checkbox,FormControlLabel,Avatar,ListItemAvatar} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles'
import dayjs from 'dayjs'

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from  '@material-ui/icons/Chat';
import MyButton from './MyButton.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import Favorite from '@material-ui/icons/Favorite';
import FormGroup from '@material-ui/core/FormGroup';
import {connect} from 'react-redux' 
import {likeScream,unlikeScream}  from '../redux/actions/dataaction.js'
import DeleteScream from './DeleteScream'
const styles={
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
      },
      image: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      content: {
        padding: 0,
        objectFit: 'cover'
      },
    text:{
        color:'black'
    },
}


 class  Postcard extends Component {

    
    
     likedscream=()=>{
      
         if(this.props.Posts.likes.find(p=>(p===this.props.user._id)))
         return true;
         return false;
        
      
     }
     unlikedscream=()=>{
        if(this.props.data.posts.likes.find(p=>(p===this.props.user._id)))
        return false;
        return true;
        return false;
     }
     likeScream=()=>{
      this.props.likeScream(this.props.Posts._id);
     }
     unlikeScream=()=>{
        this.props.unlikeScream(this.props.Posts._id);
     }
     
    userliked=()=>{

    }

    render() {
        dayjs.extend(relativeTime)
        
        const {classes,
            Posts:{postedBy:{_id,username,profilepic},createdAt,body},
            user:{authenticated} 
                  }=this.props
                
      const deleteButton =
                  authenticated && this.props.user.username === this.props.Posts.postedBy.username ? (
                    <DeleteScream postId={this.props.Posts._id} />
                  ) : console.log("Sorry1");
       const likebutton=!authenticated?(
       <MyButton tip="Like">
           <Link to='/login'>
               <FavoriteBorder color='primary'/>
           </Link>
       </MyButton>
       ):(
           this.likedscream()?(
               <MyButton tip='Undo like' onClick={this.unlikeScream}>
                   <FavoriteIcon color='secondary'></FavoriteIcon>
               </MyButton>
           ):(<MyButton tip='Like' onClick={this.likeScream}>
           <FavoriteBorder color='primary'></FavoriteBorder>
       </MyButton>)
       )
       console.log(this.props)
       let v=null;
       if(this.props.Posts.photo){
       v=(<div><img src={`/${this.props.Posts.photo}`} alt="profile" className="profile-image" /></div>)
        }
        return (
            
          
           <Card className={classes.card}>
          <ListItemAvatar>
         
         <Avatar alt="dp" src={`/${profilepic}`} />
           </ListItemAvatar>
         
         
               <CardContent className={classes.content}>
                   <Typography variant='h6' color="primary" component={Link} to={`/username/${username}`}>{username}</Typography>
                   {deleteButton}
                  <Typography className={classes.text} component={Link} to={`/post/${this.props.Posts._id}`}>
                  
                   <Typography variant='body1'>{body}</Typography>
                   <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                   
                   </Typography>
                   {v}
                   {likebutton} 
                   <span onClick={this.userliked}>{Object.keys(this.props.Posts.likes).length} Likes</span>  
                  <Link to={`/post/${this.props.Posts._id}`} style={{color:'black'}}>
                      <MyButton tip="comments">    
                   <ChatIcon color="primary"/>                  
                   </MyButton>
                   <span onClick={this.commentsection}>{Object.keys(this.props.Posts.comments).length} Comments</span></Link>
                  </CardContent>
           </Card>
         
        )
    }
}

const mapStateToProps=(state)=>({
    user:state.user,
    data:state.data
    });

const mapActionsToProps={
    likeScream,unlikeScream
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Postcard));

