import React, { Component } from 'react'
import axios from 'axios'
import {Grid,TextField,Button} from '@material-ui/core'
import { Redirect } from 'react-router'
import {connect} from 'react-redux' 
import {withStyles} from '@material-ui/core/styles'

const styles={
    card:{
        display:'flex',
        marginBottom:20
    },
    content:{
        padding:25
    },
    text:{
        color:'black'
    }
}

class CommentForm extends Component {
 constructor(props){
     super(props)
     this.state={
        authenticated1:false,
         comment:'',
         errors:'',
     }
 }

  handleChange=(e)=>{
      
    this.setState({
        [e.target.name]:e.target.value
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const userdata={
        text:this.state.comment,
        postId:this.props.postId
    }
  
      axios.put('/api/comments',userdata)
      .then(res=>{
          console.log(res.data);
      })
      .catch(err=>{
          
          console.log(err);
      })
  this.setState({
    comment:''
  })
    }

    render() {
     
       const  {user:{authenticated} }=this.props
       
       const errors=this.state.error
       const comment=this.state.comment1
        const commentFormMarkup = authenticated ? (
          <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="comment"
                type="text"
                label="Comment"
                // error={errors.comment ? true : false}
                // helperText={errors.comment}
                value={this.state.comment}
                onChange={this.handleChange}
                fullWidth
                // className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{marginTop:'1em'}}
              >
                Submit
              </Button>
            </form>
          
          </Grid>
        ) : null;
        return commentFormMarkup;
      }
    }

    const mapStateToProps=(state)=>({
        user:state.user,
       
        });
  
    
    export default connect(mapStateToProps)(withStyles(styles)(CommentForm));
    
    