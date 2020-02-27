import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../reducers/rootReducer'
import { createPostAction } from '../reducers/post/postAction'
import {
  TextField,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  root: {
    margin: "10px"
  },
}))

export default function Post() {
  const classes = useStyle()
  const dispatch = useDispatch()
  const { postList } = useSelector((storeState: StoreState) => ({
    postList: storeState.posts.postList,
  }))
  const [text, setText] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setText(value)
  }

  const handleClick = () => {
    dispatch(
      createPostAction({
        id: Math.random().toString(),
        content: text,
        createAt: new Date().toUTCString(),
      }),
    )
    setText("")
  }

  return (
    <Container maxWidth="md">
      <TextField
        placeholder="write something"
        label="Create Post"
        variant="outlined"
        fullWidth
        className={classes.root}
        onChange={handleChange}
        value={text}
      />
      <Button className={classes.root} color="primary" onClick={handleClick} variant="outlined">
        Submit
      </Button>
      <Divider variant="middle"/>
      <section className={classes.root}>
        Posts:
        <List>
          {postList.map((post) => (
            <Container maxWidth="sm">
              <ListItem key={post.id} button>
                <ListItemText id={post.id} primary={post.content} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Container>
          ))}
        </List>
      </section>
    </Container>
  )
}
