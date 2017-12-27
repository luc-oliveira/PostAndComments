import React, { Component } from 'react';

class PostList extends Component{

    componentDidMount(){
        //console.log(this.props.posts);
    }

    render(){
        let posts = this.props.posts !== undefined && this.props.posts.length > 0 
                        ? this.props.posts
                        : [];
        return (
            <ul>
                {posts.map(post => <li key={post.id}>{post.author} - {post.body}</li>)}
            </ul>
    )}
}

export default PostList