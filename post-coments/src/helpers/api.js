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

export function putPost(post){
    let obj = JSON.stringify({ "title": post.title, "body": post.body });
    return fetch(`${API_URL}/posts/${post.id}`, {
        method: 'put',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: obj
    }).then(resp => resp.json());
}

export function deletePost(post){
    return fetch(`${API_URL}/posts/${post.id}`, {
        method: 'delete',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        })
    }).then(resp => resp.json());
}

export function sendComment(comment){
    return fetch(`${API_URL}/comments`, {
        method: 'post',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: JSON.stringify(comment)
    }).then(resp => resp.json());
}

export function voteComment(commentId, vote){
    return fetch(`${API_URL}/comments/${commentId}`, {
        method: 'post',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: JSON.stringify({"option":`${vote}`})
    }).then(resp => resp.json());
}

export function deleteComment(comment){
    return fetch(`${API_URL}/comments/${comment.id}`, {
        method: 'delete',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        })
    }).then(resp => resp.json());
}

export function putComment(comment){
    let obj = JSON.stringify({ "body": comment.body, "timestamp": comment.timestamp });
    return fetch(`${API_URL}/comments/${comment.id}`, {
        method: 'put',
        headers: new Headers({ 
            "Authorization": AUTH,
            "Content-Type":"application/json" 
        }),
        body: obj
    }).then(resp => resp.json());
}