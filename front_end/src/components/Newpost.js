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
import MyButton from './MyButton';
import { connect } from 'react-redux';
import { postScream,} from '../redux/actions/dataaction';

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
        title:''
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
        this.props.postScream({ body: this.state.body,title:this.state.title});
        this.setState({
            open:false
        })
      };
    render() {
          const {classes}=this.props
            return (
                <Fragment>
                  <MyButton onClick={this.handleOpen} tip="Post a Scream!">
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
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                      <form onSubmit={this.handleSubmit}>
                        <TextField
                          name="body"
                          type="text"
                          label="SCREAM!!"
                          multiline
                          rows="3"
                          placeholder="Add a new Post"
                        //   error={errors.body ? true : false}
                        //   helperText={errors.body}
                          className={classes.textField}
                          onChange={this.handleChange}
                          fullWidth
                        />
                        <TextField
                          name="title"
                          type="text"
                          label="Title!!"
                          multiline
                          rows="3"
                          placeholder="Add Title"
                        //   error={errors.body ? true : false}
                        //   helperText={errors.body}
                          className={classes.textField}
                          onChange={this.handleChange}
                          fullWidth
                        />
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
    UI: state.UI
  });

export default connect(
    mapStateToProps,
    { postScream }
  )(withStyles(styles)(Newpost));
