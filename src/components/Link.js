import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// const Link = ({ active, children, onClick, category }) => {
//   if (active) {
//     return <span>{children}</span>
//   }

//   return (
//   //    <NavLink
//   //   to={category === 'all' ? '/' : `/${ category }`}
//   //     activeStyle={ {
//   //       textDecoration: 'none',
//   //       color: 'black'
//   //     }}
//   //   >
//   //   {children}
//   // </NavLink>
//   )
// }

const Link = ({ active, children, onClick, category }) => {
  if (active) {
    return <span>{children}</span>

  }

  return (
     <NavLink
      to={category === 'all' ? '/' : `/${ category }`}
      onClick={e => {
         onClick()
       }}
    >
    {children}
    </NavLink>
  )

  // return (
  //   <a
  //     href=""
  //     onClick={e => {
  //       e.preventDefault()
  //       onClick()
  //     }}
  //   >
  //     {children}
  //   </a>
  // )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link