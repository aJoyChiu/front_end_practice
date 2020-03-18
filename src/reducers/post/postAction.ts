import { Post } from '../../model/post'

export const POST_ACTIONS = {
  CREATE_POST: "@POST/CREATE",
  CREATE_POST_SUCCESS: "@POST/CREATE_SUCCESS",
  CREATE_POST_FAILED: "@POST/CREATE_FAILED",
  GET_POST_LIST: "@POST/GET_LIST",
  GET_POST_LIST_SUCCESS: "@POST/GET_LIST_SUCCESS",
  GET_POST_LIST_FAILED: "@POST/GET_LIST_FAILED",
  DELETE_POST: "@POST/DELETE",
  DELETE_POST_SUCCESS: "@POST/DELETE_SUCCESS",
  DELETE_POST_FAILED: "@POST/DELETE_FAILED",
}

export const createPost = (content: object) => ({
  type: POST_ACTIONS.CREATE_POST,
  payload: content,
})

export const createPostSuccess = (payload: Post) => ({
  type: POST_ACTIONS.CREATE_POST_SUCCESS,
  payload,
})

export const createPostFailed = () => ({
  type: POST_ACTIONS.CREATE_POST_FAILED,
})

export const getPostList = () => ({
  type: POST_ACTIONS.GET_POST_LIST,
})

export const getPostListSuccess = (payload: Post[]) => ({
  type: POST_ACTIONS.GET_POST_LIST_SUCCESS,
  payload,
})

export const getPostListFailed = () => ({
  type: POST_ACTIONS.GET_POST_LIST_FAILED,
})

export const deletePost = (id: string) => ({
  type: POST_ACTIONS.DELETE_POST,
  payload: id,
})

export const deletePostSuccess = (id: string) => ({
  type: POST_ACTIONS.DELETE_POST_SUCCESS,
  payload: id,
})

export const deletePostFailed = () => ({
  type: POST_ACTIONS.DELETE_POST_FAILED,
})
