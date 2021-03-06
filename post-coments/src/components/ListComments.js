import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Button, Icon } from 'react-materialize';
import {  voteComment, excludeComment } from '../actions';
import Moment from 'react-moment';

class ListComments extends Component{
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

  changeOrder = (order) => {this.setState({order})};

  render(){
    let { comments } = this.props;
    return (
        <Row>
            <Table centered>
                <thead>
                    <tr>
                        <th data-field="exclude"></th>
                        <th data-field="edit"></th>
                        <th data-field="author">Autor</th>
                        <th data-field="body">Comment</th>
                        <th data-field="data" onClick={() => this.changeOrder('timestamp')} 
                            className={`order-item ${this.state.order === "timestamp" ? "order-item-active":""}`}>Data</th>
                        <th data-field="voteScore" onClick={() => this.changeOrder('voteScore')} 
                            className={`order-item ${this.state.order === "voteScore" ? "order-item-active":""}`}>Votos</th>
                        <th data-field="voteUp"></th>
                        <th data-field="voteDown"></th>
                    </tr>
                </thead>
                <tbody>
                {comments.sort((a,b) => this.comparer(this.state.order,a,b)).map(comment => 
                          <tr key={comment.id}>
                            <td><Button className="btn-edit" 
                            onClick={()=>{  this.props.deleteComment(comment, this.props.onRefreshComments); }}><Icon tiny>close</Icon></Button></td>
                            <td><Button className="btn-edit"
                            onClick={()=>{ this.props.onEditComment(comment)}}><Icon tiny>create</Icon></Button></td>
                            <td>{comment.author}</td>
                            <td>{comment.body}</td>
                            <td> <Moment format="DD/MM/YYYY" date={comment.timestamp} /> </td>
                            <td>{comment.voteScore}</td>
                            <td><Button className="btn-vote green" 
                                    onClick={()=> {
                                        this.props.voteComment(comment.id, 'upVote', this.props.onRefreshComments);
                                    }}><Icon tiny>thumb_up</Icon></Button></td>
                            <td><Button className="btn-vote red" 
                                    onClick={()=>{ 
                                        this.props.voteComment(comment.id, 'downVote', this.props.onRefreshComments);
                                    }}><Icon tiny>thumb_down</Icon></Button></td>
                          </tr>
                  )}
                </tbody>
            </Table>
        </Row>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch){
  return {
    voteComment: (commentId, vote, callback) => dispatch(voteComment(commentId, vote, callback)),
    deleteComment: (comment, callback) => dispatch(excludeComment(comment, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComments);