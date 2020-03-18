import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from './reducers/rootReducer'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
  const { postList } = useSelector((state: StoreState) => ({
    postList: state.posts.postList,
  }))
  const classes = useStyles()
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Clicked {count}, currently {postList.length} Post
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setCount(count + 1)
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}
