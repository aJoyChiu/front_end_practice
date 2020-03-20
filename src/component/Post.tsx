import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { createPost, getPostList, updatePost, deletePost } from '../reducers/post/postAction'
import { StoreState } from '../reducers/rootReducer'

export default function Posts() {
  const dispatch = useDispatch()
  const { postList } = useSelector((storeState: StoreState) => ({
    postList: storeState.posts.postList
  }))

  const [content, setContent] = useState<string>('')
  const [updateContent, setUpdateContent] = useState<string>('')

  useEffect(() => {
    dispatch(getPostList())
  }, [dispatch])

  const handleClick = () => {
    dispatch(createPost({ content }))
    setContent('')
  }

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    if (updateContent !== '') {
      dispatch(updatePost({
        id: e.currentTarget.dataset['postId']!,
        content: updateContent,
      }))
      setUpdateContent('')
    }
  }

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dispatch(deletePost(e.currentTarget.dataset['postId']!))
    }, [dispatch])

  const handlePostChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setContent(value)
    }, [setContent]
  )

  const handleUpdateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setUpdateContent(value)
    }, [setUpdateContent]
  )

  return (
    <Container maxWidth='md'>
      <TextField
        id='standard-full-width'
        label='Create Post'
        style={{ marginTop: 20 }}
        placeholder='input content..'
        fullWidth
        variant="outlined"
        onChange={handlePostChange}
        value={content}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id='standard-full-width'
        label='Post update content'
        style={{ marginTop: 20 }}
        placeholder='input update content..'
        fullWidth
        variant="outlined"
        onChange={handleUpdateChange}
        value={updateContent}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button onClick={handleClick} color='primary' variant="outlined" style={{ margin: 8 }}>
        Submit
      </Button>
      <Box border={1} borderRadius="borderRadius" borderColor="grey.400" style={{ marginTop: 10, padding: 2 }}>
        <Toolbar><Typography style={{ margin: 5 }}>Posts</Typography></Toolbar>
        <List component='nav' aria-label='contacts'>
          {postList.map((post) => (
            <ListItem key={post.id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${post.id}`}
                  src={post.imageUrl}
                  data-post-id={post.id}
                  onClick={handleAvatarClick}
                />
              </ListItemAvatar>
              <ListItemText id={post.id} primary={post.content} secondary={post.createAt} />
              <ListItemSecondaryAction data-post-id={post.id} onClick={handleDelete}>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}
