import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import {Avatar,ListItemAvatar} from '@material-ui/core' 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CommentForm from './CommentForm.js'
const styles = {

  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  }

};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    console.log(this.props)
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { text, createdAt, postedBy:{profilepic, username }} = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                 
                  <Grid item sm={0.5}>
                
                      <Avatar alt="dp" src={`/${profilepic}`}/>
                     </Grid>
                    <div className={classes.commentData} style={{marginRight:'5em'}}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${username}`}
                        color="primary"
                      >
                        {username}
                      </Typography>
                     
                      <span className={classes.invisibleSeparator}>
                      <Typography variabnt="body1">{text}</Typography></span>
                    </div>
                 
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);