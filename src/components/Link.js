import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = ({ active, children, onClick, category }) => {
  if (active) {
    return <span className="category-item category-item-active">{children}</span>
  }

  return (
     <NavLink className="category-item"
      to={category === 'all' ? '/' : `/${ category }`}
      onClick={e => {
         onClick()
       }}
    >
    {children}
    </NavLink>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link