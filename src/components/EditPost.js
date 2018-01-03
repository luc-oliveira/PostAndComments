import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize';
import serializeForm from 'form-serialize';
import uuid from '../helpers/utils';
import * as  POSTS_API from '../helpers/api';
import { Link } from 'react-router-dom';

class EditPost extends Component{
    state = {
        post: null,
        comments: null
    }

    componentWillMount(){
        let id = this.props.id;
        this.setState({post: this.props.post.posts.find(post => post.id === id)});
    }

    componentDidMount(){
        POSTS_API
            .getPostComments(this.state.post.id)
            .then(comment => this.setState({comments: comment}));
    }

  handleSubmit = (e) => {
    e.preventDefault();
    const post = serializeForm(e.target, { hash: true })

    //add necessary values to post
    post.id = uuid();
    post.timestamp = Date.now();
    post.voteScore = 1;
          
  }

  render(){
    return (
        <Row> 
            <Col s={8} offset="s2"> 
                <Card>
                { this.state.post != null && this.state.post.author !== null ? this.state.post.author : ''}
                { this.state.comments != null ? this.state.comments.length : ''}
                {/* <form onSubmit={this.handleSubmit}>
                    <Input name="title" placeholder="Título do post" s={12} />
                    { <Input name="author" placeholder="Digite o nome do autor" s={6} />
                    <Input s={6} name="category" type='select' label="Categoria" defaultValue='1'>
                        <option value='react'>React</option>
                        <option value='redux'>Redux</option>
                        <option value='udacity'>Udacity</option>
                    </Input> }
                    <Input name="body" type="textarea" placeholder="Escreva seu post aqui" s={12} />
                    <Button className="btn waves">Postar <Icon>send</Icon></Button>
                </form> */}
                </Card>
            </Col>
            <Link to="/">
                <Button floating large className='red btn-fixed-bottom left-5' waves='light' icon='chevron_left' />
            </Link>
        </Row>
    )
  }
}

function mapStateToProps (state) {
  return state
}


export default connect(mapStateToProps, null)(EditPost);