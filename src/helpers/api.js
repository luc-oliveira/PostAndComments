const AUTH = 'Lucas';
const API_URL = 'http://localhost:3001';

export function fetchPosts(){ 
    return fetch(`${API_URL}/posts`, {
        method: 'get',
        headers: new Headers({ "Authorization": AUTH})
    }).then(resp => resp.json());
}

export function getPost(postId){ 
    return fetch(`${API_URL}/posts/${postId}`, {
        method: 'get',
        headers: new Headers({ "Authorization": AUTH})
    }).then(resp => resp.json());
}

export function sendPost(post){
    return fetch(`${API_URL}/posts`, {
        method: 'post',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: JSON.stringify(post)
    }).then(resp => resp.json());
}

export function votePost(postId, vote){
    return fetch(`${API_URL}/posts/${postId}`, {
        method: 'post',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: JSON.stringify({"option":`${vote}`})
    }).then(resp => resp.json());
}

export function getPostComments(postId){ 
    return fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'get',
        headers: new Headers({ "Authorization": AUTH})
    }).then(resp => resp.json());
}