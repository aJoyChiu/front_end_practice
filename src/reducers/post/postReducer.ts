import { AnyAction } from 'redux'
import { POST_ACTIONS } from './postAction'
import { Post } from '../../model/post'

export interface PostState {
  postList: Post[]
}

const initState = {
  postList: []
}

export default function postReducer(state: PostState = initState, action: AnyAction) {
  switch (action.type) {
    case POST_ACTIONS.CREATE_POST_SUCCESS:
      return { ...state, postList: state.postList.concat(action.payload)}
    case POST_ACTIONS.GET_POST_LIST_SUCCESS:
      return { ...state, postList: action.payload }
    case POST_ACTIONS.DELETE_POST_SUCCESS:
      return { ...state, postList: state.postList.filter(post => post.id !== action.payload)}
    default:
      return state
  }
}
