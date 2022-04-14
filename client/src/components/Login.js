import React,{ useState } from 'react';
import './style.css';
import GoogleLogin from "react-google-login"

const users = JSON.parse(localStorage.getItem("users"))

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method: 'POST',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if(res.status === 400 || !data){
      console.log("Invalid Credentials");
    } else {
      console.log("Login Successful") 
    }
  } 

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profile.Obj)
  }

  return (
    <div>
      <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href='./login'>Login</a>
      <a href='./products'>Products</a>
      <a href='./checkout'>Checkout</a>
    </nav>
    <form className='container' method='POST'>
      <h2>Login Form</h2>
       <div className="field">
            <label>email</label>
            <input
              type="text" name="email" placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password" name="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>{formErrors.password}</p>

            <button className="btn" onClick={loginUser}>Submit</button>
            <GoogleLogin 
              clientId="988952657537-a425ml6135ls565317pnq21rkfj6v1ek.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
    </form>
    </div>
  );
}

export default Login;
