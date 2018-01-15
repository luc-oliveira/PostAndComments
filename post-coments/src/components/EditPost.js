import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize';
import Modal from 'react-modal';
import { persistComment, editComment } from '../actions';
import serializeForm from 'form-serialize';
import Moment from 'react-moment';
import * as  POSTS_API from '../helpers/api';
import { Link } from 'react-router-dom';
import uuid from '../helpers/utils';
import ListComments from './ListComments';

class EditPost extends Component{
    state = {
        post: null,
        comments: null,
        id: this.props.id,
        modalIsOpen: false,
        modalComment: null
    }  

    componentDidMount(){
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        if(this.props.post.posts.length > 0){
            this.setState({post: this.props.post.posts.find(post => post.id === this.state.id)});
            this.refreshComment();
        }else{
            POSTS_API
            .getPost(this.state.id)
            .then(postReceived => {
                this.setState({post: postReceived});
                if (Object.keys(postReceived).length > 0)
                    this.refreshComment();
            });
        }

    }
    
    refreshComment(){
       POSTS_API
            .getPostComments(this.state.id)
            .then(comment => this.setState({comments: comment})); 
    }

    openModal(comment) {
        this.setState({ 
            modalIsOpen: true, 
            modalComment: comment.body !== undefined
                            ? comment
                            : null});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false, modalComment: null});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const post = serializeForm(e.target, { hash: true })
        post.id = this.state.id;

        if(this.props.editPost)
            this.props.editPost(post)        
    }

    handleComentSubmit = (e) => {
        e.preventDefault();
        const commentario = serializeForm(e.target, { hash: true })
        commentario.timestamp = Date.now();

        if(this.state.modalComment == null){
            //add necessary values to post
            commentario.id = uuid();
            commentario.voteScore = 1;   
            commentario.parentId = this.state.id;  
            
            if(this.props.addComment)
                this.props.addComment(commentario);
                this.refreshComment();
                this.closeModal();
        }else{
             if(this.props.editComment)
                commentario.id = this.state.modalComment.id;
                this.props.editComment(commentario, () => this.refreshComment());
                this.closeModal();
        }   
    }

  render(){
    let { post } = this.state;
    return (
        //validate if post exists
        post !== null && Object.keys(post).length === 0 
            ? <Redirect to='/'  />
            : <Row> 
                <Col s={8} offset="s2"> 
                    <Card>
                    { this.state.post != null 
                        &&
                    <Col s={12}>
                        <Col s={12} className="right-align margin-15">
                            <Button className="btn-remove red btn" onClick={() => this.props.deletePost(post)}><Icon tiny>close</Icon></Button>
                        </Col>
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
                            <Input required name="title" label="Título" s={12} defaultValue={post.title}/>
                            <Input required name="author" label="Autor" s={6}  defaultValue={post.author}/>
                            <Input s={6} name="category" type='select' label="Categoria" defaultValue={post.category}>
                                <option value='react'>React</option>
                                <option value='redux'>Redux</option>
                                <option value='udacity'>Udacity</option>
                            </Input> 
                            <Input required name="body" type="textarea" label="Post" s={12} defaultValue={post.body} />
                            <Col s={12} className="right-align"><Button className="btn">Editar<Icon right tiny>create</Icon></Button></Col>
                        </form> 
                    </Col>
                    }
                    { this.state.comments != null && this.state.comments.length > 0
                            ? <ListComments 
                                comments={this.state.comments} 
                                onRefreshComments={()=> this.refreshComment()}
                                onEditComment={(comment) => this.openModal(comment)}
                                parentId={this.state.id} />
                            : 'Não existem comentários neste post.'}
                    <Row> 
                        <Col>
                            <Button className="btn-add green" onClick={this.openModal}>
                                <Icon tiny>add</Icon>
                            </Button>
                            <Modal 
                                style={{content: {height: '400px'}}}
                                onAfterOpen={this.afterOpenModal}
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal} >
                                <Row> 
                                    <Col> 
                                        <form onSubmit={this.handleComentSubmit}>
                                            <Input name="author" placeholder="Digite o nome do autor" s={12}
                                            defaultValue={this.state.modalComment == null ? '': this.state.modalComment.author}
                                            disabled={this.state.modalComment == null ? false: true}
                                            />
                                            <Input name="body" type="textarea" placeholder="Escreva seu comentário aqui" s={12} 
                                            defaultValue={this.state.modalComment == null ? '': this.state.modalComment.body}/>
                                            {this.state.modalComment == null 
                                                ?  <Button className="btn waves">Comentar <Icon>send</Icon></Button> 
                                                :  <Button className="btn waves">Editar comentário <Icon>send</Icon></Button>}
                                        </form>                                    
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
    )}
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch){
  return {
    addComment: (data) => dispatch(persistComment(data)),
    editComment: (data, callback) => dispatch(editComment(data,callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);