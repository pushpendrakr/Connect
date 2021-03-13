import React, { Component } from 'react'
import {Paper,withStyles} from '@material-ui/core'

const styles={

}

export class Profile extends Component {
    render() {
        const {classes}=this.props;
        return (
            <div>
              <Paper className={classes.paper}>
              
             </Paper>  
            </div>
        )
    }
}

export default withStyles(styles)(Profile)
