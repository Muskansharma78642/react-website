import React,{ useState } from 'react';
import './style.css';
import GoogleLogin from "react-google-login"
import Loader from './Loader';
// import { useNavigate } from 'react-router-dom'
// import Products from './Products'


const Login = () => {
  // const navigate = withRouter()
  // const [jwtoken, setJwtoken] = useState(false)
  // const token = JSON.parse(localStorage.getItem('jwtoken'))
  // {token ? setJwtoken(true) : setJwtoken(false)}
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState()

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
    // if(res.status === 400 || !data){
    //   console.log("Invalid Credentials");
    // } else {
    //   console.log("Login Successful") 
    // }
    if(!data.token){
      console.log("Invalid Credentials")
    }else {
      console.log(data.token)
      localStorage.setItem("jwtoken", JSON.stringify(data.token))
      localStorage.setItem("activeUser", JSON.stringify(data.userLogin)) 
      setLoading(false)
    }
  } 

  const responseGoogle =  async(response) => {
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
    // if(res.status === 400 || !data){
    //   console.log("Invalid Credentials");
    // } else {
    //   console.log("Login Successful") 
    // }
    if(!data.token){
      console.log("Invalid Credentials")
    }else {
      console.log(data.token)
      localStorage.setItem("jwtoken", JSON.stringify(data.token))
      localStorage.setItem("activeUser", JSON.stringify(data.userExist)) 
    }
  }

  return (
    <div>
      <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href='./login'>Login</a>
      <a href='./products'>Products</a>
      <a href='./checkout'>Checkout</a>
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
    {/* <Route path='/products' element={jwtoken ? <Navigate to={<Products />}/> : <p>Login was not Successful</p>}/> */}
    </div>
  );
}

export default Login;
