import React, { useEffect } from 'react';
import './style.css';

const Logout = () => {
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        })
    })

    localStorage.removeItem('activeUser');
    localStorage.removeItem('jwtoken')

  return (
    <>
    <nav id='navbar'>
        <a href='./registration'>Registeration</a>
        <a href='./login'>Login</a>
        <a href='./products'>Products</a>
        <a href='./checkout'>Checkout</a>
    </nav>
    <div className='container'>
      <h2>You are logged out. Login again to continue shopping!</h2>
    </div>
    </> 
  );
}

export default Logout;
