import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { persistPost, editPost, excludePost, fetchPosts } from '../actions';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { Row } from 'react-materialize';
import Footer from './Footer';
import VisiblePostList from './VisiblePostList';

class App extends Component {
  componentDidMount(){
    this.props.receivePosts();
  }

  render() {
    return (
      <div>
        <Route exact path="/(react|redux|udacity|)/" render={() => (
          <Row>
            <Footer />
            <VisiblePostList category={ this.props.match.params || 'all'} />
          </Row>
        )} />
        <Route exact path='/newPost'  render={({ history }) => ( 
          <NewPost 
            AddPost= {post => {
              this.props.addPost(post) 
              history.push('/')
            }}
          /> 
        )} />
        <Route exact path='/:category/:postId'  render={({ history }) => ( 
          <EditPost 
            id={this.props.match.params.postId}
            
            EditPost= {post => {
              this.props.editPost(post) 
              history.push('/')
            }}

            DeletePost= {post => {
              this.props.removePost(post) 
              history.push('/')
            }}

          /> 
        )} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state }
}

function mapDispatchToProps (dispatch){
  return {
    addPost: (data) => dispatch(persistPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    removePost: (data) => dispatch(excludePost(data)),
    receivePosts: () => dispatch(fetchPosts())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
