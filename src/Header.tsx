import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from './reducers/rootReducer'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import MenuIconenu from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Header() {
  const classes = useStyles()
  const { postList } = useSelector((storeState: StoreState) => ({
    postList: storeState.posts.postList,
  }))
  const [count, setCount] = useState<number>(0)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIconenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Clicked {count} times, current Posts {postList.length}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setCount(count + 1)
            }}
          >
            Click me
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}