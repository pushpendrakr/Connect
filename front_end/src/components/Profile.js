import React, { Component,Fragment} from 'react'
import {Paper,withStyles} from '@material-ui/core'
import Link from 'react-router-dom/Link'
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
// import EditDetails from './EditDetails';
import MyButton from './MyButton';
// import ProfileSkeleton from '.util/ProfileSkeleton';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/useraction';

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
            color: 'black'
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
class Profile extends Component {
    handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('postimage', image);
      this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
      const fileInput = document.getElementById('imageInput');
      fileInput.click();
    };
    handleLogout = () => {
      
      this.props.logoutUser();
    };
    render() {
      const {
        classes,
        user: {
          username,profilepic,email,
          authenticated
        }
      } = this.props;
      const element =<FontAwesomeIcon style={{color:'black'}}icon={faSignOutAlt} />
    let p1=(
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={`/${profilepic}`} alt="profile" className="profile-image" />
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
            <Typography
              component={Link}
              to={`/username/${username}`}
              color="primary"
              variant="h5"
            >
              @{username}
              </Typography>
          
          
            {email && (
              <Fragment>
                <LinkIcon color="primary" />
               <hr/>
               <span>email: {email}</span>
                <hr />
              </Fragment>
            )}
           <MyButton tip="Logout" onClick={this.handleLogout}>
          {element}

           </MyButton>
          </div>
        
        </div>
      </Paper>
    )
    let p2= (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to='/login'
          >
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to='/signup'>
            Signup
          </Button>
        </div>
      </Paper>
    )
   
      let profileMarkup = 
        authenticated ?  p1:p2;
     if(this.props.userpage)profileMarkup=p1;
      return profileMarkup;
    }
  }
  
const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = { logoutUser, uploadImage };

  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(Profile));


