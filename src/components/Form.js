import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { context } from "../store/store";
import Navbar from "./Navbar";
import { request } from "../service";
import styled from "./Form.module.css";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkSubmit, setCheckSubmit] = useState('');
  const [isInvalid, setInvalid] = useState(true);

  const navigate = useNavigate();
  const { setAdmin } = useContext(context);

  const handleChangeInputEmail = (e) => {
    setEmail(e.target.value);
    setCheckEmail('');
    setCheckSubmit('');
  };

  const handleChangeInputPassword = (e) => {
    setPassword(e.target.value);
    setCheckPassword('');
    setCheckSubmit('');
  };

  const handleBlurPassword = () => {
    setCheckSubmit('');
    setCheckPassword('Password must be at least 8 chars');
    if(password.trim().length > 7) {
      setCheckPassword('')
      setInvalid(false);
    }
  };

  const handleBlurEmail = () => {
    setCheckSubmit('');
    setCheckEmail('Invalid email!');
    if(email.includes('@') && email.trim().length > 0) {
      setCheckEmail('')
      setInvalid(false);
    }
  };

  const handleClick = async(e) => {
    e.preventDefault();
    if(!isInvalid) {
      try{
          const data = await request.signIn(email, password);
          if(data.data.message === 'ok') {
            console.log(data.data.user);
            setAdmin(data.data.user);
            localStorage.setItem('admin', JSON.stringify(data.data.user));
            navigate('/dashboard');
          }
        
        setEmail('');
        setPassword('');
      }catch(err) {
        setCheckSubmit('Excuse me! Your info invalid!');
        console.log(err)
      }
    }else {
      setCheckSubmit('Excuse me! Your info invalid!');
    }
  };
  return (
    <div>
      <Navbar />
      <form>
        <div className={styled.form}>
          <div className={styled.group}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeInputEmail}
              onBlur={handleBlurEmail}
            />
            <div className={styled.error} >{checkEmail}</div>
          </div>
          <div className={styled.group}>
            <input
              type="pass"
              name="password"
              value={password}
              // style={{ borderColor: checkPassword ? '#ea4a4a' : ''}}
              onChange={handleChangeInputPassword}
              onBlur={handleBlurPassword}
            />
            <div className={styled.error} >{checkPassword}</div>
          </div>
          <div className={styled.error}>{checkSubmit}</div>
          <button className='btn' type='submit' onClick={handleClick}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
