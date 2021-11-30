import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Styles.css'
const SignUp = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const[repeat,setrepeat]= useState('')
  const [error, setError] = useState('');
  const [ping, setping] = useState(false);
  let headers = {
    "X-Authorization": "sk_36323ab24dea17e5792bff2f94985c1e45bac8c6510a0",
    "Content-Type": "application/json",
    "Accept": "application/json"}
    let body={email:email,meta:{password:password}}
  const handleSubmit = async (e) => {
    e.preventDefault();
     try{if (password===repeat)
     { await axios.post('https://api.chec.io/v1/customers',body,{headers:headers})
      setError('User created successfully')
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      window.location.reload();}
      else setError('check password')
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  }
  if(!ping)
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Sign Up form</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="input" placeholder="email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <input type="password" value={repeat} onChange={(e) => setrepeat(e.target.value)} className="input" placeholder="Repeat Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>SignUp</span>
            </button>
            <Link to='/login' onClick={()=>setping(!ping)} style={{fontSize:'15px',color:'black',textDecoration:'none'}}>Already member? Login</Link>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  );
  else return(<LoginForm/>)
};

export default SignUp;