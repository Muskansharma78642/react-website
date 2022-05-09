import React, {useState, useEffect} from 'react';
import './style.css';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Registration = () => {
  const [formValues, setFormValues] = useState(
    { username: "", email: "", phone: "", password: ""}
  );
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState()
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleKeyPress = (e) => {
    setFormErrors(validate(formValues));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
    const errors = {}
  };

  const postData = async(e) => {
    e.preventDefault()
    setLoading(true)
    const { username, email, phone, password } = formValues;
     
    const res = await fetch("/register", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({username, email, phone, password})
    });
    const data = await res.json();

    if(data.status === 422 || !data) {
      console.log("invalid registration")
    } else {
      console.log("registration successful")
      setLoading(false)
      navigate('/login')

      console.log(data)
    }
  }

  useEffect(() => {
    //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if(!values.username.match(/^[a-zA-Z\-]+$/)){
      errors.username = "This is not a valid name format!"
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if(!values.phone) {
      errors.phone = "Mobile Number Required"
    }else if (!values.phone.match(/^[0-9]{10}$/)){
      errors.phone = "Enter valid Mobile Number"
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
   return(
    <div>
      <nav id='navbar'>
        <Link to='/registration'>Registeration</Link>
        <Link to='/login'>Login</Link>
        <Link to='/products'>Products</Link>
        <Link to='/checkout'>Checkout</Link>
      </nav>

      {loading ? <Loader /> : null}

      <h2 className='title'>Register Yourself!</h2>
      <div className='container'>
        <form method='POST' onSubmit={handleSubmit}>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Username</label>
            <input
              type="text" name="username" placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
              onKeyPress={(e)=>handleKeyPress(e)}
            />
          </div>
          <p>{formErrors.username}</p>

          <div className="field">
            <label>Email</label>
            <input
              type="text" name="email" placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              onKeyPress={(e)=>handleKeyPress(e)}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Mobile Number</label>
            <input
              type="text" name="phone" placeholder="Mobile Number"
              value={formValues.phone}
              onChange={handleChange}
              onKeyPress={(e)=>handleKeyPress(e)}
            />
          </div>
          <p>{formErrors.phone}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password" name="password" placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              onKeyPress={(e)=>handleKeyPress(e)}
            />
          </div>
          <p>{formErrors.password}</p>

          <button className="btn" onClick={(e) => postData(e)}>Submit</button>
        </div>
      </form>
      </div>
    </div>
   )
}
export default Registration
