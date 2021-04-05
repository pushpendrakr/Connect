import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from './MyButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faBackspace} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataaction';

const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '1%'
    },
    deleteb:{
        color:'black'
    }
  };

class DeleteScream extends Component {
    
    state = {
        open: false
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      deleteScream = () => {
          
        this.props.deleteScream(this.props.postId);
        this.setState({open:false})
    }

    render() {
    const { classes } = this.props;
 // console.log(this.props.postId)
 
const element =<FontAwesomeIcon style={{color:'black'}}icon={faBackspace} />
        return (
            <Fragment>
        <MyButton
          tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline className={classes.deleteb} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
        )
    }
}
export default connect(
    null,
    { deleteScream }
  )(withStyles(styles)(DeleteScream));