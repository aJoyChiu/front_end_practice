import { AnyAction } from 'redux'
import {Post, POST_ACTIONS} from './postAction'

export interface PostState {
  postList: Post[]
}

const initState = {
  postList: []
}

export default function postReducer(state: PostState = initState, action: AnyAction) {
  switch (action.type) {
    case POST_ACTIONS.CREATE_POST:
      state.postList.push(action.data)
      return state
    default:
      return state
  }
}
