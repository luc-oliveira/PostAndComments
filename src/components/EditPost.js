import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize';
import serializeForm from 'form-serialize';
import Moment from 'react-moment';
import * as  POSTS_API from '../helpers/api';
import { Link } from 'react-router-dom';

class EditPost extends Component{
    state = {
        post: null,
        comments: null,
        id: this.props.id
    }

    componentWillMount(){
        if(this.props.post.posts.length > 0){
            this.setState({post: this.props.post.posts.find(post => post.id === this.state.id)});
        }
        else{
            POSTS_API
            .getPost(this.state.id)
            .then(postReceived => this.setState({post: postReceived}));
        }
    }

    componentDidMount(){
        POSTS_API
            .getPostComments(this.state.id)
            .then(comment => this.setState({comments: comment}));
    }

  handleSubmit = (e) => {
    e.preventDefault();
    const post = serializeForm(e.target, { hash: true })
    post.id = this.state.id;

    if(this.props.EditPost)
       this.props.EditPost(post)        
  }

  render(){
    let { post } = this.state;
    return (
        <Row> 
            <Col s={8} offset="s2"> 
                <Card>
                { this.state.post != null 
                    &&
                   <Col s={12}>
                    <Col s={12} className="right-align margin-15"><Button className="btn-remove red btn" onClick={() => this.props.DeletePost(post)}><Icon tiny>close</Icon></Button></Col>
                    
                    <form onSubmit={this.handleSubmit}>
                        <Col s={6}>
                            <span className="span-info">
                                <label>Criado em: </label>
                                <Moment format="DD/MM/YYYY" date={post.timestamp} /></span>
                        </Col>
                        <Col s={6} className="right-align">
                            <span className="span-info">
                                <label>Votos: {post.voteScore}</label>
                            </span>
                        </Col>
                        <Input name="title" label="Título" s={12} defaultValue={post.title}/>
                        <Input name="author" label="Autor" s={6}  defaultValue={post.author}/>
                        <Input s={6} name="category" type='select' label="Categoria" defaultValue={post.category}>
                            <option value='react'>React</option>
                            <option value='redux'>Redux</option>
                            <option value='udacity'>Udacity</option>
                        </Input> 
                        <Input name="body" type="textarea" label="Post" s={12} defaultValue={post.body} />
                        <Col s={12} className="right-align"><Button className="btn">Editar<Icon right tiny>create</Icon></Button></Col>
                    </form> 
                   </Col>
                }
                { this.state.comments != null ? this.state.comments.length : ''}
                </Card>
            </Col>
            <Link to="/">
                <Button floating large className='grey lighten-1 btn-fixed-bottom left-5' waves='light' icon='chevron_left' />
            </Link>
        </Row>
    )
  }
}

function mapStateToProps (state) {
  return state
}


export default connect(mapStateToProps, null)(EditPost);