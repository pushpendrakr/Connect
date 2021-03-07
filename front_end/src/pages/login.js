import React, { Component } from 'react'
import {Grid,Paper,Typography,TextField,Button} from '@material-ui/core'
class login extends Component {
    render() {
        return (
            <Grid align='center'>           
            <Typography variant='h4' align='center' gutterbuttom='true'>Login</Typography>
            <TextField align='center' placeholder='Username' align='center'></TextField>    
            <TextField align='center' placeholder='Password' align='center'></TextField>
            </Grid>
 
        )
    }
}

export default login
