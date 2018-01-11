import { connect } from 'react-redux'
import { setVisibilityCategory } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.category === state.visibilityCategory
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityCategory(ownProps.category))
    }
  }
}

const CategoryLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default CategoryLink