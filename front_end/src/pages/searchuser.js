import axios from 'axios'
import React, { Component } from 'react'

export class searchuser extends Component {
    state={
        users:null
    }
    componentDidMount(){console.log("loaded")
        const username=this.props.match.params.username;
        axios.get('/api/search',{query:username})
        .then(res=>{console.log(this.state.users)})
    }
  
    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default searchuser
