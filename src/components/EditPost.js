import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize';
import Modal from 'react-modal';
import { persistComment } from '../actions';
import serializeForm from 'form-serialize';
import Moment from 'react-moment';
import * as  POSTS_API from '../helpers/api';
import { Link } from 'react-router-dom';
import uuid from '../helpers/utils';
import ListComments from './ListComments';

class EditPost extends Component{
    constructor() {
        super();

        this.state = {
            post: null,
            comments: null,
            id: this.id,
            modalIsOpen: true
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    refreshComment(){
       POSTS_API
            .getPostComments(this.state.id)
            .then(comment => this.setState({comments: comment})); 
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const post = serializeForm(e.target, { hash: true })
        post.id = this.state.id;

        if(this.props.EditPost)
            this.props.EditPost(post)        
    }

    handleComentSubmit = (e) => {
        e.preventDefault();
        const commentario = serializeForm(e.target, { hash: true })

        //add necessary values to post
        commentario.id = uuid();
        commentario.timestamp = Date.now();
        commentario.voteScore = 1;   
        commentario.parentId = this.state.id;  
        
        if(this.props.addComment)
            //this.props.addComment(commentario);
            //this.refreshComment();
            //console.log(this.Modal.props.actions[0]);
            //console.log(this.Modal.props.close()); //setState({close: true}); 
            this.closeModal();
            //this.Modal.props.modal = 'close';
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
                { this.state.comments != null && this.state.comments.length > 0
                        ? <ListComments comments={this.state.comments} onRefreshComments={()=> this.refreshComment()} parentId={this.state.id} />
                        : 'Não existem comentários neste post.'}
                <Row> 
                    <Col>
                        <Button className="btn-add green" onClick={this.openModal}>
                            <Icon tiny>add</Icon>
                        </Button>
                        <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                            >
                            <Row> 
                                <Col> 
                                    <Card>
                                        <form onSubmit={this.handleComentSubmit}>
                                            <Input name="title" placeholder="Título do post" s={12} />
                                            <Input name="author" placeholder="Digite o nome do autor" s={6} />
                                            <Input name="body" type="textarea" placeholder="Escreva seu post aqui" s={12} />
                                            <Button className="btn waves">Comentar <Icon>send</Icon></Button>
                                        </form>
                                    </Card>
                                </Col>
                            </Row>
                        </Modal>
                    </Col> 
                </Row>
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

function mapDispatchToProps (dispatch){
  return {
    addComment: (data) => dispatch(persistComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);