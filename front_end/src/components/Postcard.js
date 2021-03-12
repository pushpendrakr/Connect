import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import {CardActions, TextField, Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
const styles={
    card:{
        display:'flex',
        marginBottom:20
    },
    content:{
        padding:25
    }
}


export class  Postcard extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes,Posts:{postedBy:{id,username},createdAt,body}}=this.props
        console.log(this.props.Posts)
        return (
           <Card className={classes.card}>
               <CardContent className={classes.content}>
                   <Typography variant='h5' color="primary" component={Link} to={`/user/${username}`}>{username}</Typography>
                   <Typography variant='body1'>{body}</Typography>
                   <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                           
              </CardContent>
           </Card>
        )
    }
}

export default withStyles(styles)(Postcard);
