import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      createLogger({
        diff: true,
        collapsed: true,
        actionTransformer: (action: any) => {
          return action
        },
      }),
    ),
  )
}
