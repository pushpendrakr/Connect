import React, { Component } from 'react'
import axios from 'axios'
class Pic extends Component {

    state={
        file:null,
       error:null
    }
     types =['image/png','image/jpeg']
    changehandler=(e)=>{
        let e1=e.target.files[0]
        console.log(e1);
        if(e1&&this.types.includes(e1.type)){
         this.setState({file:e1,error:''})
        }
        else{
       this.setState({error:'please select an image file png or jpeg'})
        }
    }

    render() {
        if(this.state.file)console.log(this.state.file)
        return (
            
            <div>
            <form enctype="multipart/form-data">
            <input  type='file' onChange={this.changehandler}/>
            </form>
            <div>
                {this.state.error&&(<div>{this.state.error}</div>)}
                {this.state.file&&(<div>{this.state.file.name}</div>)}
            </div>
            </div>

        )
    }
}

export default Pic
