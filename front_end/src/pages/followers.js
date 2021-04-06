import { Grid, Typography } from '@material-ui/core';
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import {Paper} from '@material-ui/core'
import Suggestions from '../components/Suggestions.js'
import {connect} from 'react-redux'
import { getUserdata} from '../redux/actions/useraction';
export class searchuser extends Component {
    state={
        users:null
    }
    componentDidMount(){
        this.props.getUserdata();
        const id1=this.props.match.params.id;
        axios.post('/api/followers',{id:id1})
        .then(res=>{
            this.setState({
                users:res.data,
            })
        })
    }
  
    render() {

        let v=null
        v=this.state.users;
        let y=null
        y=v?v.map(p2=>
            (<Suggestions User={p2}/>)
            
           ):null
        return (
            <Fragment>
                <Typography style={{textAlign:'center'}}variant='h4'>
                       People
                       <div> {y&&(Object.keys(y).length>0)?(  <div style={{marginLeft:'8em'}}>
                       {y}
                       </div>):<span>...No Result Found</span>}</div>
                </Typography>
               
               
              
            </Fragment>
        )
    }
}
const mapStateToProps=(state)=>({
    data:state.data,
    user:state.user

    });

const mapActionsToProps={
    getUserdata
}


export default connect(mapStateToProps,mapActionsToProps)((searchuser));

