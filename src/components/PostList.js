import React, { Component } from 'react';
import { Table } from 'react-materialize';
import Moment from 'react-moment';

class PostList extends Component{
    state = {
      order: 'voteScore'
    }

    comparer = (key, firstObject, secondObject) => {
    if(firstObject[key] < secondObject[key]){
        return 1;
    }
    if(firstObject[key] > secondObject[key]){
        return -1;
    }
    return 0;
    }

    changeOrder = (order) => {this.setState({order})}

    componentDidMount(){
        //console.log(this.props);
        //console.log(this.state);
    }

    render(){
        let posts = this.props.posts !== undefined && this.props.posts.length > 0 
                        ? this.props.posts
                        : [];
        return (
            <Table centered>
                <thead>
                    <tr>
                        <th data-field="author">Autor</th>
                        <th data-field="body">Post</th>
                        <th data-field="data" onClick={() => this.changeOrder('timestamp')}>Data</th>
                        <th data-field="voteScore" onClick={() => this.changeOrder('voteScore')}>Votos</th>
                    </tr>
                </thead>
                <tbody>
                   {posts.sort((a,b) => this.comparer(this.state.order,a,b)).map(post => 
                       <tr key={post.id}> 
                        <td>{post.author}</td>
                        <td>{post.body}</td>
                        <td> <Moment format="DD/MM/YYYY" date={post.timestamp} /> </td>
                        <td>{post.voteScore}</td>
                       </tr>
                    )}
            </tbody>
            </Table>
    )}
}

export default PostList;