import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import {AppBar,Toolbar,Button} from '@material-ui/core'

class navbar extends Component {
    render() {
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Button color="inherit" component={Link} to='/login'>
                       Login
                        </Button>
                        <Button color="inherit" component={Link} to='/signup'> 
                        Signup
                        </Button>
                        <Button color="inherit" component={Link} to='/'>
                        Home
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default navbar
