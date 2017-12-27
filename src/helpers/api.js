export function fetchPosts(){ 
    return fetch('http://localhost:3001/posts', {
        method: 'get',
        headers: new Headers({ "Authorization": 'Lucas' })
    }).then(posts => posts.json());
}