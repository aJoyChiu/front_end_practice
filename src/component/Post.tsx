import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  Box,
  Collapse,
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
  const [openUpdateField, setOpenUpdateField] = useState<boolean>(false)
  const [openUpdateFieldNumber, setOpenUpdateFieldNumber] = useState<number>(-1)

  useEffect(() => {
    dispatch(getPostList())
  }, [dispatch])

  const handleSubmitClick = () => {
    dispatch(createPost({ content }))
    setContent('')
    setOpenUpdateFieldNumber(-1)
    setOpenUpdateField(false)
  }

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const targetIndex = parseInt(e.currentTarget.id)
    if(targetIndex !== openUpdateFieldNumber) {
      setUpdateContent('')
      setOpenUpdateField(true)
    } else {
      setOpenUpdateField(!openUpdateField)
    }
    setOpenUpdateFieldNumber(targetIndex)
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
      setOpenUpdateFieldNumber(-1)
      setOpenUpdateField(false)
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

  const convertISODateToYYYYMMDD = (ISODate: string): string => {
    const date = new Date(ISODate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const mm = month < 10 ? '0' + month : month
    const dt = date.getDate()
    const dd = dt < 10 ? '0' + dt : dt

    return year + '-' + mm + '-' + dd
  }

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
      <Button onClick={handleSubmitClick} color='primary' variant="outlined" style={{ margin: 8 }}>
        Submit
      </Button>
      <Box border={1} borderRadius="borderRadius" borderColor="grey.400" style={{ marginTop: 10, padding: 2 }}>
        <Toolbar><Typography style={{ margin: 5 }}>Posts</Typography></Toolbar>
        <List component='nav' aria-label='contacts'>
          {postList.map((post, index) => (
            <div key={`${index}`}>
              <ListItem id={`${index}`} key={post.id} button onClick={handleItemClick}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${post.id}`}
                    src={post.imageUrl}
                    data-post-id={post.id}
                    onClick={handleAvatarClick}
                  />
                </ListItemAvatar>
                <ListItemText id={post.id} primary={post.content} secondary={convertISODateToYYYYMMDD(post.createAt)} />
                <ListItemSecondaryAction data-post-id={post.id} onClick={handleDelete}>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={openUpdateField && openUpdateFieldNumber === index} timeout="auto" unmountOnExit>
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
              </Collapse>
            </div>
          ))}
        </List>
      </Box>
    </Container>
  )
}
