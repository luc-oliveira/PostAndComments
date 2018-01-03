import * as  POSTS_API from '../helpers/api';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SET_VISIBILITY_CATEGORY = 'SET_VISIBILITY_CATEGORY';
export const VISUALIZE_POST = 'VISUALIZE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const LOAD_POSTS = 'LOAD_POSTS';

export function addPost(post){
    return{
        type: ADD_POST,
        post
    }
};

export function removePost(post){
    return {
        type: REMOVE_POST,
        post
    }
};

export function visualizePost(post){
    return {
        type: VISUALIZE_POST,
        post
    }
}

export function setVisibilityCategory(category){
  return {
    type: SET_VISIBILITY_CATEGORY,
    category
  }
}

export const receivePosts = posts =>({
    type: RECEIVE_POSTS,
    posts
});

export const fetchPosts = () => dispatch => {
    POSTS_API
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
}

export const persistPost = (post) => dispatch => {
    POSTS_API
        .sendPost(post)
        .then(post => dispatch(addPost(post)))
}

export const getSinglePost = (postId) => dispatch => {
    POSTS_API
        .getPost(postId)
        .then(post => dispatch(visualizePost(post)))
}

export const votePost = (postId, vote) => dispatch => {
    POSTS_API
        .votePost(postId, vote)
        .then(post => dispatch(fetchPosts()))
}

export const getPostComments = (postId) => dispatch => {
    POSTS_API
        .getPostComments(postId)
        .then(comments => console.log(comments))
}