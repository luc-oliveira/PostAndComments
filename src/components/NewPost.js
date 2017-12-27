import React, { Component } from 'react';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize';
import serializeForm from 'form-serialize';
import uuid from '../helpers/utils';
import { Link } from 'react-router-dom';

class NewPost extends Component{
  
  componentDidMount(){
      //console.log(this.props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const post = serializeForm(e.target, { hash: true })

    //add necessary values to post
    post.id = uuid();
    post.timestamp = Date.now();
    post.voteScore = 1;

    if(this.props.AddPost)
       this.props.AddPost(post)       
  }

  render(){
    return (
        <Row> 
            <Col s={8} offset="s2"> 
                <Card>
                <form onSubmit={this.handleSubmit}>
                    <Input name="title" placeholder="Título do post" s={12} />
                    <Input name="author" placeholder="Digite o nome do autor" s={6} />
                    <Input s={6} name="category" type='select' label="Categoria" defaultValue='1'>
                        <option value='react'>React</option>
                        <option value='redux'>Redux</option>
                        <option value='udacity'>Udacity</option>
                    </Input>
                    <Input name="body" type="textarea" placeholder="Escreva seu post aqui" s={12} />
                    <Button className="btn waves">Postar <Icon>send</Icon></Button>
                </form>
                </Card>
            </Col>
            <Link to="/">
                <Button floating large className='red btn-fixed-bottom left-5' waves='light' icon='chevron_left' />
            </Link>
        </Row>
    )
  }
}

export default NewPost