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
        .then(comments => comments)
}

export const editPost = (post) => dispatch => {
    POSTS_API
        .putPost(post)
        .then(post => dispatch(fetchPosts()))
}

export const excludePost = (post) => dispatch => {
    POSTS_API
        .deletePost(post)
        .then(post => dispatch(fetchPosts()))
}

export const persistComment = (comment) => dispatch => {
    POSTS_API
        .sendComment(comment)
        .then(comment => console.log(comment))
}

export const voteComment = (commentId, vote) => dispatch => {
    POSTS_API
        .voteComment(commentId, vote)
        .then(comment => console.log(comment))
        //.then(comment => dispatch(fetchComments()))
}

export const excludeComment = (comment) => dispatch => {
    POSTS_API
        .deleteComment(comment)
        .then(comment => console.log(comment))
        //.then(comment => dispatch(fetchPosts()))
}
