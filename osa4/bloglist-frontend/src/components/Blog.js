import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog, postComment } from '../reducers/blogReducer'
import { toggleVisibility } from '../reducers/visibilityReducer'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Blog = ({
  blog,
  user,
  deleteBlog,
  voteBlog,
  visibleBlogs,
  toggleVisibility,
  comment,
  handleChange,
  postComment
}) => {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


    const classes = useStyles()


  const showWhenValidUser = (blog) => {
      return { display: (blog.user.username === user.username) ? '' : 'none' }


  }
  if (!blog) {
    return (
      <div>loading...</div>
    )
  } else {
  return (
    <div>
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {blog.title} {blog.author}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {blog.url}
            </Typography>
            <Typography>

            likes {blog.likes}<Button size="small" onClick={() => {voteBlog(blog, user.token)}}>like</Button>
            </Typography>
            <p>{blog.user.username}</p>
          </CardContent>
          <CardActions>
          <div style = {showWhenValidUser(blog)} className="removebutton">
            <Button size="small" onClick={() => { deleteBlog(blog, user.token)} }>remove</Button>
          </div>
          </CardActions>
        </Card>
      </div>

    <div id="comments">
      <h2>comments</h2>
      <form onSubmit = {() => postComment(comment, blog, user)}>
        <input type="text" value={comment} onChange={handleChange}></input>
        <button>comment</button>
      </form>
      <ul>
        {blog.comments.map(c =>
          <li key={c}>{c}</li>
        )}
      </ul>
    </div>
  </div>

  )
}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    visibleBlogs: state.visibility
  }
}

const mapDispatchToProps = {
  voteBlog,
  deleteBlog,
  toggleVisibility,
  postComment
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
