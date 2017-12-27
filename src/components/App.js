import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost, removePost, fetchPosts } from '../actions';
import NewPost from './NewPost';
import { Row } from 'react-materialize';
import Footer from './Footer';
import VisiblePostList from './VisiblePostList';

class App extends Component {
  state ={
    posts: []
  }

  componentDidMount(){
    this.props.receivePosts();
    //console.log(this.props);
  }

  render() {
    return (
      <div>
        <Route path="/(react|redux|udacity|)/" render={() => (
          <Row>
            <VisiblePostList category={ this.props.match.params || 'all'} />
            <Footer />
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
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state }
}

function mapDispatchToProps (dispatch){
  return {
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    receivePosts: () => dispatch(fetchPosts())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
