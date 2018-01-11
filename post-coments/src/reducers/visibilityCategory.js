import { SET_VISIBILITY_CATEGORY } from '../actions'

const visibilityCategory=(state = 'all', action) => {
  switch (action.type) {
    case SET_VISIBILITY_CATEGORY:
      return action.category
    default:
      return state
  }
}

export default visibilityCategory