import express from 'express'
import uuid from 'uuid/v4'

const fakeData = [
  {
    id: uuid(),
    content: 'this is my post',
    created_at: '2019-12-19T11:22:33Z',
    updated_at: new Date().toISOString(),
    imageUrl: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  {
    id: uuid(),
    content: 'omg I am twitting right now?',
    created_at: '2019-12-19T11:22:33Z',
    updated_at: new Date().toISOString(),
    imageUrl: 'https://material-ui.com/static/images/avatar/2.jpg',
  },
  {
    id: uuid(),
    content: 'gogo bro',
    created_at: '2019-12-19T11:22:33Z',
    updated_at: new Date().toISOString(),
    imageUrl: 'https://material-ui.com/static/images/avatar/3.jpg',
  },
]

const PostsRouter = express.Router()

PostsRouter.get('/', function(req, res) {
  res.send(fakeData)
})

PostsRouter.post('/', function(req, res) {
  const newScenario = {
    ...req.body,
    id: uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // imageUrl: 'https://source.unsplash.com/random',
  }
  fakeData.push(newScenario)
  res.send(newScenario)
})

PostsRouter.put('/', function(req, res) {
  const updatedData = fakeData.find((post, idx) => {
    if (post.id === req.body.id) {
      fakeData[idx] = {
        ...fakeData[idx],
        ...req.body,
      }
      return true
    }
    return false
  })
  res.send(updatedData)
})

PostsRouter.delete('/:id', function(req, res) {
  const ids = req.params.id.split(',')
  ids.forEach(toBeDeletedId => {
    const idx = fakeData.findIndex(s => s.id === toBeDeletedId)
    fakeData.splice(idx, 1)
  })
  res.send(fakeData)
})

export default PostsRouter
