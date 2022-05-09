import React,{ useState } from 'react';
import './style.css';
import GoogleLogin from "react-google-login"
import Loader from './Loader';
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState()
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true)

    const res = await fetch('/login', {
      method: 'POST',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data)

    if(!data.token){
      console.log("Invalid Credentials")
    }else {
      console.log(data.token)
      localStorage.setItem("jwtoken", JSON.stringify(data.token))
      localStorage.setItem("activeUser", JSON.stringify(data.userLogin)) 
      setLoading(false)
      navigate('/products')
    }
  } 

  const responseGoogle =  async(response) => {
    setLoading(true)
    console.log(response);
    console.log(response.profileObj)
    const email = response.profileObj.email
    const username = response.profileObj.givenName
    const phone = 1234567890
    const password = response.profileObj.googleId

    const res = await fetch('/googleLogin', {
      method: 'POST',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, phone })
    });

    const data = await res.json();
    console.log(data)
   
    if(!data.token){
      console.log("Invalid Credentials")
    }else {
      console.log(data.token)
      setLoading(false)
      localStorage.setItem("jwtoken", JSON.stringify(data.token))
      localStorage.setItem("activeUser", JSON.stringify(data.userExist))  
      navigate('/products')
    }
  }

  return (
    <div>
      <nav id='navbar'>
      <Link to='./registration'>Registeration</Link>
      <Link to='./login'>Login</Link>
      <Link to='./products'>Products</Link>
      <Link to='./checkout'>Checkout</Link>
    </nav>
    {loading? <Loader /> : null}
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
