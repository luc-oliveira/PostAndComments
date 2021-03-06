import {
    ADD_POST,
    REMOVE_POST,
    VISUALIZE_POST,
    RECEIVE_POSTS
} from '../actions'

const initialState = {
    posts: [],
    order: 'voteScore'
}

function post(state = initialState, action){
    const { post } = action;

    switch(action.type){
        case RECEIVE_POSTS: 
            return {
                ...state,
                posts: action.posts
            }

        case ADD_POST:
            return {
                ...state,
                posts: [].concat(...state['posts'], action.post)
            }

        case REMOVE_POST:
            return {
                ...state,
                [post] : null
            }
        
        case VISUALIZE_POST:
            return {
                ...state,
                post
            }

        default:
            return state
    }
}

export default post