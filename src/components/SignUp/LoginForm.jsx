import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Link} from 'react-router-dom';
import SignUp from './SignUp';
const LoginForm = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const[repeat,setrepeat]= useState('')
    const [error, setError] = useState('');
    const [ping, setping] = useState(true);
    var customer;
    let headers = {
      "X-Authorization": "sk_36323ab24dea17e5792bff2f94985c1e45bac8c6510a0",
      "Content-Type": "application/json",
      "Accept": "application/json"}
    const handleSubmit = async (e) => {
      e.preventDefault();
       { await axios.get('https://api.chec.io/v1/customers/',{headers:headers})
       .then(function (response) {
customer=response.data.data.filter(e=>e.email===email)[0]         
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       })
       }console.log(customer)
       if(customer.meta.password===password ){
        await axios.post(`https://api.chec.io/v1/customers/${customer.id}/issue-token`,{},{headers:headers})
       .then((response)=>{
           let token=response.data.jwt;
           console.log(token)
       })
       .catch((err)=>console.log(err))
       }
       else(setError('Oops, incorrect credentials.'))
        // setError('User created successfully')
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        // window.location.reload();
    
    //   } catch (err) {
    //     setError('Oops, incorrect credentials.');
    //   }
    }
    if(ping)
    return (
      <div className="wrapper">
        <div className="form">
          <h1 className="title">Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="input" placeholder="email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
            <div align="center">
              <button type="submit" className="button">
                <span>Login</span>
              </button><br/>
              <Link to='/signup' onClick={()=>setping(!ping)} style={{fontSize:'15px',color:'black',textDecoration:'none'}}>Not a member? Register now</Link>
            </div>
          </form>
          <h1>{error}</h1>
        </div>
      </div>
    );
    if(!ping) return(<SignUp/>)
};
  

export default LoginForm;