const auth = 'Lucas';

export function fetchPosts(){ 
    return fetch('http://localhost:3001/posts', {
        method: 'get',
        headers: new Headers({ "Authorization": auth})
    }).then(resp => resp.json());
}

export function sendPost(post){
    return fetch('http://localhost:3001/posts', {
        method: 'post',
        headers: new Headers({ 
            "Authorization": auth,
            "Content-Type":"application/json" 
        }),
        body: JSON.stringify(post)
    }).then(resp => resp.json());
}