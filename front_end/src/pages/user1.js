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

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataaction';

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
    
    };
    componentDidMount() {
      const handle = this.props.match.params.username;
    
  
      this.props.getUserData(handle);
      axios
        .get(`/api/user1/${handle}`)
        .then((res) => {
       
          this.setState({
            profile: res.data
          });
        })
        .catch((err) => console.log(err));
    }
    render() {
      const { posts} = this.props.data;
       console.log(this.state)
      const {classes}=this.props
       const screamsMarkup =
       posts === null ? ( 
        <p>No screams from this user</p>
      ) : 
       (posts.map((scream) => {
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
            onChange={this.handleImageChange}
          />
          <MyButton
            tip="Edit profile picture"
            onClick={this.handleEditPicture}
            btnClassName="button"
          >
          <EditIcon color="primary" />
          </MyButton>
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
     let x=0,y=0,z=0;
     if(this.state.profile){
       x=Object.keys(this.state.profile.followers).length;
       y=Object.keys(this.state.profile.following).length;
       z=Object.keys(posts).length;
      }

        return (
          <div className="fullpage" style={{maxWidth:"70%",margin:"0 auto"}}>
              {p1}
              <div style={{display:'flex'}}>
                <h3>Followers:&nbsp;{x}</h3>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h3>Following:&nbsp;{y}</h3>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h3>Posts:&nbsp;{z}</h3>

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
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getUserData }
  )(withStyles(styles)(user));
