import React, { Component,Fragment } from 'react'
import axios from 'axios'


import {withStyles} from '@material-ui/core/styles'
import Postcard from '../components/Postcard'
import Comments from './Comments'
import CommentForm from './CommentForm'
import {connect} from 'react-redux'
import {getUserdata} from '../redux/actions/useraction.js'
class Post1 extends Component {
    constructor(props){
        super(props)
        this.state={
         post:null   
        }
    }

  componentDidUpdate(){
    const postid=this.props.match.params.post_id;


    axios.get(`/api/posts/${postid}`)
    .then(res=>{
        this.setState({post:res.data[0]})
    }
    
    )
  }
    componentDidMount(){
        const postid=this.props.match.params.post_id;
     
          this.props.getUserdata();
      axios.get(`/api/posts/${postid}`)
      .then(res=>{
          this.setState({post:res.data[0]})
      }
      
      )
    }
    
    
    render() {
    
        const co=this.state.post?this.state.post.comments:null;
           

        return (
        <Fragment>
            {this.state.post===null?(<span>...Loading</span>):<Postcard Posts={this.state.post}/>}   
        {co&&(<CommentForm postId={this.state.post._id}/>)}
         {co&&(<Comments comments={co}/>)}
        </Fragment>    
        
        )
    }
}


const mapStateToProps=(state)=>({
user:state.user
})
const mapActionsToProps={
    getUserdata
}

export default connect(mapStateToProps,mapActionsToProps)((Post1));
