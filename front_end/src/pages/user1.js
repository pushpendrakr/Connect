import React, { Component,Fragment} from 'react'
import {Paper,withStyles} from '@material-ui/core'
import Link from 'react-router-dom/Link'
import {Button,Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import axios from 'axios'
import dayjs from 'dayjs';
// import EditDetails from './EditDetails';
import MyButton from '../components/MyButton';
// import ProfileSkeleton from '.util/ProfileSkeleton';
import Postcard from '../components/Postcard'
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from '../components/edit.js';
import { Dialog,DialogTitle,DialogActions,DeleteOutline} from '@material-ui/core';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataaction';
import { uploadImage,followuser,unfollowuser,getUserdata} from '../redux/actions/useraction';
const styles={
  paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
}



class user extends Component {
    state = {
      profile: null,
       handle1:null,
       open1:false,
       open2:false,
       post2:null
    };
    componentDidUpdate(){
      const handle = this.props.match.params.username;
     
      axios.get(`/api/user1/${handle}`)
        .then((res) => {
       
          this.setState({
            profile: res.data,
            handle1:handle
          });
        })
        .catch((err) => console.log(err));
        axios.get(`/api/user/${handle}`)
        .then(res=>{
          this.setState({
            post2:res.data,
          })
        })
    }
    componentDidMount() {
      const handle = this.props.match.params.username;
     
      axios.get(`/api/user1/${handle}`)
        .then((res) => {
       
          this.setState({
            profile: res.data,
            handle1:handle
          });
        })
        .catch((err) => console.log(err));
        axios.get(`/api/user/${handle}`)
        .then(res=>{
          this.setState({
            post2:res.data,
          })
        })
        this.props.getUserdata();
    }
    handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('postimage', image);
      this.props.uploadImage(formData);
      const handle = this.props.match.params.username;
      axios.get(`/api/user1/${handle}`)
      .then((res) => {
     
        this.setState({
          profile: res.data,
          handle1:handle
        });
      })
      .catch((err) => console.log(err));
      
     
      this.props.getUserData(handle);
    };
    handleEditPicture = () => {
      const fileInput = document.getElementById('imageInput');
      fileInput.click();
      const handle = this.props.match.params.username;
      axios
      .get(`/api/user1/${handle}`)
      .then((res) => {
     
        this.setState({
          profile: res.data,
          handle1:handle
        });
      })
      .catch((err) => console.log(err));
      
     
      this.props.getUserData(handle);
    };
    alreadyfollowed=()=>{
      if(!this.props.user.authenticated)return false;
      if(this.props.user.following.find(p=>(p===this.state.profile._id)))
      return true;
      return false;
    }
    followhandler=()=>{
 
     this.props.followuser(this.state.profile._id);
     this.setState({ open1: false });
     this.setState({ open2: false });
     return;
    }
    unfollowhandler=()=>{
  
      this.props.unfollowuser(this.state.profile._id);
      this.setState({ open1: false });
      this.setState({ open2: false });
      return;
     }
     
    handleOpen1 = () => {
      console.log("hello1")
      this.setState({ open1: true });
    };
    handleClose1 = () => {
      this.setState({ open1: false });
    };
    handleOpen2 = () => {console.log("hello2")
      this.setState({ open2: true });
    };
    handleClose2 = () => {
      this.setState({ open2: false });
    };
    render() {
      const {posts}=this.props.data  
      const {classes}=this.props
      console.log(this.state.post2)
     const post4=this.state.post2;
       const screamsMarkup =
       post4 === null ? ( 
        <p>No Posts from this user</p>
      ) : 
       (post4.map((scream) => {
        
         return <Postcard key={scream._id} Posts={scream} openDialog />;
        }))
  

     let p1=this.state.profile?(<Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={`/${this.state.profile.profilepic}`} alt="profile" className="profile-image" />
        <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={this.handleImageChange}/>
         {(this.props.user.username===this.state.profile.username)&&
          <MyButton
            tip="Edit profile picture"
            onClick={this.handleEditPicture}
            btnClassName="button">
          <EditIcon color="primary" />
          </MyButton>}
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/username/${this.state.profile.username}`}
            color="primary"
            variant="h5"
          >
            @{this.state.profile.username}
          </MuiLink>
        
        
          {this.state.profile.email && (
            <Fragment>  
              <LinkIcon color="primary" />
             <hr/>
             <span>email: {this.state.profile.email}</span>
              <hr />
            </Fragment>
          )}
         
        </div>
      
        {/* <EditDetails /> */}
      </div>
    </Paper>):(<span>Update Profile</span>) 
     let x=0,y=0,z=0,p2=null,p3=null;
     if(this.state.profile){
       x=Object.keys(this.state.profile.followers).length;
       y=Object.keys(this.state.profile.following).length;
       if(post4)z=Object.keys(post4).length;
      
       p2=null;
      if(this.props.user.authenticated&&this.state.profile){
        if(this.props.user.username!==this.state.profile.username){
          this.alreadyfollowed()?
        (p2=<Button variant='contained' color='primary' style={{marginLeft:'23em'}} onClick={this.handleOpen1}>unfollow</Button>):
        (p2=<Button variant='contained' color='primary' style={{marginLeft:'25em'}} onClick={this.handleOpen2}>follow</Button>)
      
        }
        else{
          p2=(<EditProfile handleuser={this.handleuser} o={this.props.match.params.username}/>)
        }
      }
     p3=null;
   
    }
     let x5=this.state.profile?this.state.profile._id:null;

    
        return (
          <div className="fullpage" style={{maxWidth:"70%",margin:"0 auto"}}>
              {p1}
              <div style={{display:'flex'}}>
                <Link to={`/followers/${x5}`} style={{color:'black'}}>
                <Button variant='contained' color='primary'style={{marginTop:'1em'}}><b>Followers:</b>&nbsp;{x}</Button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/following/${x5}`} style={{color:'black'}}>
                <Button variant='contained' color='primary'style={{marginTop:'1em'}}><b>Following:</b>&nbsp;{y}</Button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link style={{color:'black'}}>
                <Button variant='contained' color='primary'style={{marginTop:'1em'}}><b>Posts:</b>&nbsp;{z}</Button></Link>

                {p2}
      <Dialog
      open={this.state.open1}
      onClose={this.handleClose1}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Are you sure you want to Unfollow ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={this.handleClose1} color="primary">
          Cancel
        </Button>
        <Button onClick={this.unfollowhandler} color="secondary">
          Unfollow
        </Button>
      </DialogActions>
    </Dialog>
           
    <Dialog
      open={this.state.open2}
      onClose={this.handleClose2}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Are you sure you want to Follow  ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={this.handleClose2} color="primary">
          Cancel
        </Button>
        <Button onClick={this.followhandler} color="secondary">
          Follow
        </Button>
      </DialogActions>
    </Dialog>
        
              </div>
                 <h3>Recent Posts:</h3>
                <div className="profile-gallery" >
                  {screamsMarkup}
                </div>
          </div>
          
      );   
    }
  }
  
  

  const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user
  });

  export default connect(
    mapStateToProps,
    { getUserdata,uploadImage,followuser,unfollowuser,getUserData}
  )(withStyles(styles)(user));
