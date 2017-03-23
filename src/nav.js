import React from 'react';
import { IndexLink, Link } from 'react-router';
import './nav.css';


const Nav = () => (
  <nav className='Nav'>
    <span className='Nav-brand'>Harvest</span>
    <ul className='Nav-links'>
      <li><IndexLink to='/' activeClassName='Nav-link-active'>Workspace</IndexLink></li>
      <li><Link to='/preview' activeClassName='Nav-link-active'>Preview</Link></li>
    </ul>
  </nav>
);


export default Nav;
