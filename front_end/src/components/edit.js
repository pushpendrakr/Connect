import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from './MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails, uploadImage } from '../redux/actions/useraction';

import { getUserData } from '../redux/actions/dataaction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    palette: {
        primary: {
          light: '#33c9dc',
          main: '#00bcd4',
          dark: '#008394',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ff6333',
          main: '#ff3d00',
          dark: '#b22a00',
          contrastText: '#fff'
        }
      },
      typography: {
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
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
      },
  button: {
    float: 'right'
  }
});

class EditDetails extends Component {
  state = {
    email: '',
    open: false
  };
  mapUserDetailsToState = (email1) => {
    this.setState({
      email: email1 ? email1 : '',
   });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.email);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const {email} = this.props.user.email
    this.mapUserDetailsToState(email);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      email: this.state.email,
    };
   
    this.handleClose();

    this.props.editUserDetails(userDetails);
    
  };
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
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
       
          <Button variant="contained" color='primary' style={{marginLeft:'25em'}} onClick={this.handleOpen}>Edit Details</Button>
      
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              
             
              <TextField
                name="email"
                tpye="text"
                label="email"
                placeholder="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { editUserDetails,getUserData }
)(withStyles(styles)(EditDetails));