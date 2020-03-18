import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
// import { makeStyles } from '@material-ui/core/styles'
import { StoreState } from '../reducers/rootReducer'
import { createPost, getPostList, deletePost } from '../reducers/post/postAction'

// const useStyle = makeStyles(theme => ({
//   root: {
//     margin: "10px"
//   },
// }))

export default function Post() {
  // const classes = useStyle()
  const dispatch = useDispatch()
  const { postList } = useSelector((storeState: StoreState) => ({
    postList: storeState.posts.postList,
  }))

  const [text, setText] = useState<string>("")

  useEffect(() => {
    dispatch(getPostList())
  }, [dispatch])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setText(value)
    }, [setText])

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      dispatch(deletePost(event.currentTarget.dataset['postId']!))
    }, [dispatch])

  const handleClick = () => {
    dispatch(
      createPost({
        content: text,
        imageUrl: `https://material-ui.com/static/images/avatar/${Math.floor(Math.random() * Math.floor(5)) + 1}.jpg`
      }),
    )
    setText("")
  }

  return (
    <Container maxWidth="md">
      <TextField
        id="standard-full-width"
        label="Create Post"
        style={{ margin: 8 }}
        placeholder="input content.."
        variant="outlined"
        fullWidth
        onChange={handleChange}
        value={text}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleClick} color="primary" variant="outlined">
        Submit
      </Button>
      <Divider variant="middle" style={{ margin: 10 }}/>
      <div>
        Posts
        <List component="nav" aria-label="contacts">
          {postList.map((post) => (
            <ListItem key={post.id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${post.id}`}
                  // src={`https://material-ui.com/static/images/avatar/${idx + 1}.jpg`}
                  src={post.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText id={post.id} primary={post.content} />
              <ListItemSecondaryAction data-post-id={post.id} onClick={handleDelete}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  )

  // return (
  //   <Container maxWidth="md">
  //     <TextField
  //       placeholder="write something"
  //       label="Create Post"
  //       variant="outlined"
  //       fullWidth
  //       className={classes.root}
  //       onChange={handleChange}
  //       value={text}
  //     />
  //     <Button className={classes.root} color="primary" onClick={handleClick} variant="outlined">
  //       Submit
  //     </Button>
  //     <Divider variant="middle"/>
  //     <section className={classes.root}>
  //       Posts:
  //       <List>
  //         {postList.map((post) => (
  //           <Container maxWidth="sm">
  //             <ListItem key={post.id} button>
  //               <ListItemText id={post.id} primary={post.content} />
  //             </ListItem>
  //             <Divider variant="middle" component="li" />
  //           </Container>
  //         ))}
  //       </List>
  //     </section>
  //   </Container>
  // )
}
