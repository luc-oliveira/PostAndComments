import React from 'react';
import CategoryLink from './CategoryLink';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-materialize';

const Footer = () => (
  <Row>
    <Link to="/newPost">
      <Button floating large className='green btn-fixed-bottom right-5' waves='light' icon='add' />
    </Link>
    <CategoryLink category="all">
      All
    </CategoryLink>
    <CategoryLink category="react">
      React
    </CategoryLink>
    <CategoryLink category="redux">
      Redux
    </CategoryLink>
    <CategoryLink category="udacity">
      Udacity
    </CategoryLink>
  </Row>
)

export default Footer