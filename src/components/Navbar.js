import styled from './Navbar.module.css';
import React from 'react';
import { context } from '../store/store';
import { useContext } from 'react';

const Navbar = () => {
  const { admin } = useContext(context);
  return (
    <div>
      <div className='navbar'>
        <h3 className='title'>Admin Page</h3>
        <div>{admin.length ? admin[0].email : ''}</div>
      </div>
      <hr></hr>
    </div>
  )
}

export default React.memo(Navbar);