import { Typography } from '@material-ui/core';
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import Suggestions from '../components/Suggestions.js'
import {connect} from 'react-redux'
import { getUserdata} from '../redux/actions/useraction';
export class searchuser extends Component {
    state={
        users:null
    }
    componentDidMount(){console.log("loaded")
        this.props.getUserdata();

        const username=this.props.match.params.username;
        console.log(username)
        axios.post('/api/search',{query:username})
        .then(res=>{
            this.setState({
                users:res.data,
            })
        })
    }
  
    render() {
        console.log(this.state)
        let v=this.state.users;
        let y=v?v.map(p2=>
            (<Suggestions User={p2}/>)
            
           ):null
        return (
            <Fragment>
                <Typography style={{textAlign:'center'}}variant='h4'>
                       People
                       <div style={{marginLeft:'6em'}}>
                       {y}
                       </div>
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

