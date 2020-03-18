import { combineEpics } from 'redux-observable'
import postEpics from './post/postEpics'

export default combineEpics(...postEpics)
