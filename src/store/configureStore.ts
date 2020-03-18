import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import rootReducer from '../reducers/rootReducer'

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(
    rootReducer,
    applyMiddleware(
      epicMiddleware,
      createLogger({
        diff: true,
        collapsed: true,
        actionTransformer: (action: any) => {
          return action
        },
      }),
    ),
  )
  epicMiddleware.run(rootEpic)
  return store
}
