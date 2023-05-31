import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  container: {
    maxWidth: 1000,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(),

  },
  posts: {
    marginBottom: theme.spacing(2),
  },
  comments: {
    maxHeight: 80,
    overflowY: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const Forum = () => {
  const classes = useStyles();
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [commentIndex, setCommentIndex] = useState(-1);

  const handlePostInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleCommentInputChange = (event, index) => {
    setComment(event.target.value);
    setCommentIndex(index);
  };

  const handleCreatePost = () => {
    if (post.trim() !== '') {
      setPosts([...posts, { text: post, comments: [] }]);
      setPost('');
    }
  };

  const handleCreateComment = (postId) => {
    const postIndex = posts.findIndex((post) => post.text === postId);
    if (comment.trim() !== '') {
      const updatedPosts = [...posts];
      updatedPosts[postIndex].comments.push(comment);
      setPosts(updatedPosts);
      setComment('');
      setCommentIndex(-1);
    }
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} component={Paper} elevation={3}>
        <Typography variant="h5" className={classes.title}>
          Create Post
        </Typography>

        <form className={classes.form}>
          <TextField
            id="filled-multiline-static"
            className={classes.input}
            multiline
            rows={4}
            variant="filled"
            label="Write your post"
            value={post}
            onChange={handlePostInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleCreatePost}>
            Post
          </Button>
        </form>

        <Typography variant="h6" className={classes.title}>
          Posts
        </Typography>

        <List className={classes.posts}>
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <ListItem style={{ fontWeight: 'medium', color: 'blue' }}>
                <ListItemText primary={post.text} />
              </ListItem>

              <List className={classes.comments}>
                {post.comments.map((comment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText secondary={comment} />
                    </ListItem>
                    {index !== post.comments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <form className={classes.form}>
                <TextField
                  className={classes.input}
                  variant="standard"
                  label="Write a comment"
                  value={commentIndex === index ? comment : ''}
                  onChange={(event) => handleCommentInputChange(event, index)}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCreateComment(post.text)}
                >
                  Comment
                </Button>
              </form>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Forum;
