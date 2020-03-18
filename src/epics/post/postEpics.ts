import { ActionsObservable, ofType } from "redux-observable"
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { Post } from '../../model/post'
import responseUtil from '../../utils/responseUtil'
import {
  POST_ACTIONS,
  createPostFailed,
  createPostSuccess,
  getPostListFailed,
  getPostListSuccess,
  deletePostFailed,
  deletePostSuccess,
} from "../../reducers/post/postAction"

interface IncomingPost {
  id: string,
  content: string,
  created_at: string,
  updated_at: string,
  imageUrl: string,
}

const responseToModel = (resp: IncomingPost): Post => ({
  id: resp.id,
  content: resp.content,
  createAt: resp.created_at,
  imageUrl: resp.imageUrl,
})

const responseToModelList = (resp: any): Post[] =>
  resp.map((entity: IncomingPost) => responseToModel(entity))

export const createPostEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(POST_ACTIONS.CREATE_POST),
    exhaustMap((action: AnyAction) =>
      ajax.post('/v1/posts', action.payload).pipe(
        map((res: AjaxResponse) => createPostSuccess(responseToModel(res.response))),
        tap(() => responseUtil.success(POST_ACTIONS.GET_POST_LIST_FAILED)),
        catchError(() => of(createPostFailed())),
      ),
    ),
  )

export const getPostListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(POST_ACTIONS.GET_POST_LIST),
    exhaustMap(() =>
      ajax.get('/v1/posts').pipe(
        map((res: AjaxResponse) => getPostListSuccess(responseToModelList(res.response))),
        tap(() => responseUtil.success(POST_ACTIONS.GET_POST_LIST_FAILED)),
        catchError(() => of(getPostListFailed())),
      ),
    ),
  )

export const deletePostEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(POST_ACTIONS.DELETE_POST),
    exhaustMap((action: AnyAction) =>
      ajax.delete(`/v1/posts/${action.payload}`).pipe(
        map(() => deletePostSuccess(action.payload)),
        tap(() => responseUtil.success(POST_ACTIONS.DELETE_POST_FAILED)),
        catchError(() => of(deletePostFailed())),
      ),
    ),
  )

export default [createPostEpic, getPostListEpic, deletePostEpic]
