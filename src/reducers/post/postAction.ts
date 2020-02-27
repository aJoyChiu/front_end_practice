export const POST_ACTIONS = {
  CREATE_POST:  "@POST/CREATE",
}

export interface Post {
  id: string
  content: string
  createAt: string
}

export const createPostAction = (payload: Post) => ({
  type: POST_ACTIONS.CREATE_POST,
  data: payload,
})
