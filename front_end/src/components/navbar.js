import React, { Component, Fragment } from 'react'

import Link from 'react-router-dom/Link'
import {AppBar,Toolbar,Button} from '@material-ui/core'
import Addpost from '@material-ui/icons/Add'
import MyButton from './MyButton'
import Home from '@material-ui/icons/Home'
import Newpost from './Newpost'
import { logoutUser} from '../redux/actions/useraction';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import { connect } from 'react-redux';

class navbar extends Component {
    render() {
        const{isLoggedin}=this.props
       console.log(this.props)
        return (
            <div>
                <AppBar>
                    <Toolbar>
                    {isLoggedin?(<Fragment>
                   <Newpost/>
                   <Link to='/'>
                   <MyButton tip='Home'>
                   <Home /></MyButton></Link>
                 
                  
                  </Fragment>):

                        (<Fragment>
                            <Button color="inherit" component={Link} to='/login'>
                               Login  
                                </Button>
                                <Button color="inherit" component={Link} to='/signup'> 
                                Signup
                                </Button>
                                <Button color="inherit" component={Link} to='/'>
                                Home
                                </Button>
                                <MyButton tip="Logout" onClick={this.handleLogout}>
                           <KeyboardReturn color="primary" />
                          </MyButton>
                                </Fragment>)

                        }
                        
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapActionsToProps = { logoutUser};

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(navbar);

