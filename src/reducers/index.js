import { combineReducers } from 'redux'
import post from './post'
import visibilityCategory from './visibilityCategory'

const app = combineReducers({
  post,
  visibilityCategory
})

export default app

