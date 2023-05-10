import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { context } from '../store/store';

const Check = ({children})=>{
  const { admin } = useContext(context);
  const navigate = useNavigate();
  console.log('admin', admin);
  const checkAdmin = ()=>{
    if(!admin.length){
      navigate('/', {replace:true});
    }
  }
  useEffect(()=>{
    checkAdmin();
  },[admin]);
  return (
    <div>
      {children ? children : <Outlet />}
    </div>
  )
}
export default Check;