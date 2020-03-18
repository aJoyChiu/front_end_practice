import { Post } from '../../model/post'

export const POST_ACTIONS = {
  CREATE_POST: "@POST/CREATE",
  CREATE_POST_SUCCESS: "@POST/CREATE_SUCCESS",
  CREATE_POST_FAILED: "@POST/CREATE_FAILED",
  GET_POST_LIST: "@POST/GET_LIST",
  GET_POST_LIST_SUCCESS: "@POST/GET_LIST_SUCCESS",
  GET_POST_LIST_FAILED: "@POST/GET_LIST_FAILED",
  UPDATE_POST: "@POST/UPDATE",
  UPDATE_POST_SUCCESS: "@POST/UPDATE_SUCCESS",
  UPDATE_POST_FAILED: "@POST/UPDATE_FAILED",
  DELETE_POST: "@POST/DELETE",
  DELETE_POST_SUCCESS: "@POST/DELETE_SUCCESS",
  DELETE_POST_FAILED: "@POST/DELETE_FAILED",
}

export const createPost = (payload: {content: string}) => ({
  type: POST_ACTIONS.CREATE_POST,
  payload,
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

export const updatePost = (payload: {id: string, content: string}) => ({
  type: POST_ACTIONS.UPDATE_POST,
  payload,
})

export const updatePostSuccess = (payload: Post) => ({
  type: POST_ACTIONS.UPDATE_POST_SUCCESS,
  payload,
})

export const updatePostFailed = () => ({
  type: POST_ACTIONS.UPDATE_POST_FAILED,
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
