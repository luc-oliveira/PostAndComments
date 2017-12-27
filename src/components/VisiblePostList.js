import { connect } from 'react-redux'
import { visualizePost } from '../actions'
import PostList  from './PostList'

const getVisiblePosts = (posts, category) => {
  switch (category) {
    case 'react':
      return posts.filter(post => post.category === 'react')
    case 'redux':
      return posts.filter(post => post.category === 'redux')
    case 'udacity':
      return posts.filter(post => post.category === 'udacity')
    case 'all':
    default:
      return posts
  }
}

const mapStateToProps = state => {
  return {
    posts: getVisiblePosts(state.post.posts, state.visibilityCategory)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostClick: id => {
      dispatch(visualizePost(id))
    }
  }
}

const VisiblePostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

export default VisiblePostList