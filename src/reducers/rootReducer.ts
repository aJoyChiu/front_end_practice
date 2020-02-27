import { combineReducers } from 'redux'
import postReducer, { PostState } from './post/postReducer'

export interface StoreState {
  posts: PostState
}

export default combineReducers<StoreState>({
  posts: postReducer,
})
