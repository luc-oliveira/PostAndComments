import React, { Component } from 'react';
import { Table, Icon, Button } from 'react-materialize';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import { excludePost, votePost } from '../actions';

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

    render(){
        let posts = this.props.posts !== undefined && this.props.posts.length > 0 
                        ? this.props.posts
                        : [];
        return (
            <Table centered>
                <thead>
                    <tr>
                        <th data-field="remove"></th>
                        <th data-field="edit"></th>
                        <th data-field="author">Autor</th>
                        <th data-field="body">Post</th>
                        <th data-field="data" onClick={() => this.changeOrder('timestamp')} 
                            className={`order-item ${this.state.order === "timestamp" ? "order-item-active":""}`}>Data</th>
                        <th data-field="comments">Comentários</th>    
                        <th data-field="voteScore" onClick={() => this.changeOrder('voteScore')} 
                            className={`order-item ${this.state.order === "voteScore" ? "order-item-active":""}`}>Votos</th>
                        <th data-field="voteUp"></th>
                        <th data-field="voteDown"></th>
                    </tr>
                </thead>
                <tbody>
                   {posts.sort((a,b) => this.comparer(this.state.order,a,b)).map(post => 
                       <tr key={post.id}>
                        <td><Button className="btn-remove red btn" onClick={() => this.props.deletePost(post)}><Icon tiny>close</Icon></Button></td>
                        <td><Button className="btn-edit blue lighten-5"><NavLink  to={`/${ post.category }/${post.id}`}><Icon tiny>create</Icon></NavLink></Button></td>
                        <td>{post.author}</td>
                        <td>{post.body}</td>
                        <td> <Moment format="DD/MM/YYYY" date={post.timestamp} /> </td>
                        <td>{post.commentCount}</td>
                        <td>{post.voteScore}</td>
                        <td><Button className="btn-vote green" onClick={()=> this.props.votePost(post.id, 'upVote') }><Icon tiny>thumb_up</Icon></Button></td>
                        <td><Button className="btn-vote red" onClick={()=> this.props.votePost(post.id, 'downVote') }><Icon tiny>thumb_down</Icon></Button></td>
                       </tr>
                    )}
                </tbody>
            </Table>
    )}
}

const mapDispatchToProps = dispatch => ({
    votePost: (postId, vote) => dispatch(votePost(postId, vote)),
    deletePost: (postId) => dispatch(excludePost(postId))
});

export default connect(null,mapDispatchToProps)(PostList);