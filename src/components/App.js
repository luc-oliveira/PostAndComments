import React, { Component } from 'react';
import '../App.css';
import {Row, Input, Col, Button, Icon, Card } from 'react-materialize'
import { connect } from 'react-redux'
import { addPost, removePost } from '../actions'
import serializeForm from 'form-serialize'


class App extends Component {

  componentDidMount(){
    console.log(this.props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })

    if (this.props.addPost)
       this.props.addPost(values)
  }

  render() {
    return (
      <Row> 
        <Col s={6} offset="s3"> 
          <Card>
            <form onSubmit={this.handleSubmit}>
              <Input name="title" placeholder="Título do post" label="Título do Post" s={12} />
              <Input name="post" type="textarea" placeholder="Escreva seu post aqui" label="Post" s={12} />
              <Button className="btn waves">Postar <Icon>send</Icon></Button>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch){
  return {
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
