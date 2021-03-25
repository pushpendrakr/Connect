import React, { Component ,Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from './MyButton';
import { connect } from 'react-redux';
import { postScream} from '../redux/actions/dataaction';

import {uploadImage1} from '../redux/actions/useraction';
const styles = ({
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 10
    },
    progressSpinner: {
      position: 'absolute'
    },
    closeButton: {
      position: 'absolute',
      left: '91%',
      top: '6%'
    }
  });
export class Newpost extends Component {

    state = {
        open: false,
        body: '',
        title:'',
        image:null
      };
      handleImageChange = (event) => {
        const image1 = event.target.files[0];
        const formData = new FormData();
        formData.append('postimage', image1);
   
        this.setState({
          image:image1,
        })
      };
      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
    handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
      
        this.setState({ open: false});
      };
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body,title:this.state.title,postimage:this.state.image});
        console.log(this.props)
        // if(this.state.image){
        //   const formData = new FormData();
        //   formData.append('postimage', this.state.image);
        //   formData.append('_id',this.props.data.post1._id)
        //   this.props.uploadImage1(formData)
        // }
        this.setState({
            open:false
        })
      };
    render() {
          const {classes}=this.props
            return (
                <Fragment>
                  <MyButton onClick={this.handleOpen} tip="New Post!">
                    <AddIcon />
                  </MyButton>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                  >
                    <MyButton
                      tip="Close"
                      onClick={this.handleClose}
                      tipClassName={classes.closeButton}
                    >
                      <CloseIcon />
                    </MyButton>
                    <DialogTitle>New Post</DialogTitle>
                    <DialogContent>
                      <form onSubmit={this.handleSubmit}>
                      <TextField
                          name="title"
                          type="text"
                          label="Title"
                          multiline
                          placeholder="Add Title"
                        //   error={errors.body ? true : false}
                        //   helperText={errors.body}
                          className={classes.textField}
                          onChange={this.handleChange}
                          fullWidth
                        />
                        <TextField
                          name="body"
                          type="text"
                          label="New Post"
                          multiline
                          placeholder="Add a new Post"
                        //   error={errors.body ? true : false}
                        //   helperText={errors.body}
                          className={classes.textField}
                          onChange={this.handleChange}
                          fullWidth
                        />
                      <input
              type="file"
              id="imageInput"
              // hidden="hidden"
              onChange={this.handleImageChange}
            />
                       {/* <MyButton
              tip="Add Picture"
              onClick={this.handleEditPicture}
              btnClassName="button"
            >
            <EditIcon color="primary" />Add Picture </MyButton> */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submitButton}
                         
                        >
                          Submit
                          
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </Fragment> 
        )
    }
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    data:state.data
  });

export default connect(
    mapStateToProps,
    { postScream,uploadImage1}
  )(withStyles(styles)(Newpost));
