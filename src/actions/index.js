export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';

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