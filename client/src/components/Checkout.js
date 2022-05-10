import React, { useState, useEffect } from 'react';
import './style.css';
import StripeCheckout from 'react-stripe-checkout';
import Loader from './Loader';
import { Link } from 'react-router-dom'
import Maps from './Maps'

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState({})
  const [bill, setBill] = useState(0)
  const [loading, setLoading] = useState()

  const postProducts = async( _id, id ) => {
      console.log(_id, id)
      const res = await fetch('/checkouts', {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({_id, id})
      });
      const data = await res.json();

      if(!data) {
        console.log("Products could not be stored on DB")
      }else {
        console.log("Product removed")
        console.log(data)
      }
    }
  
  const removeProduct = (id) => {
    activeUser.cartItems.map((item) => {
      if (item.productId === id) {
        let newProducts = activeUser.cartItems.filter(x => x.productId !== id)
        activeUser.cartItems = newProducts
        console.log(newProducts)
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
        postProducts(activeUser._id, id)
        setCheckoutItems(activeUser.cartItems)
      }
    })
  }
  
  const increaseQuantity = (id) => {
    var valueCount = document.getElementById(`numberOfProduct${id}`).value
    if (valueCount >= 1) {
      valueCount++
      document.getElementById(`numberOfProduct${id}`).value = valueCount
      activeUser.cartItems.map((item) => {
      if (item.productId === id) {
        item.productQuantity = valueCount
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
        setCheckoutItems(activeUser.cartItems)
      }
    })
  }
  }
  const decreaseQuantity = (id) => {
    var valueCount = document.getElementById(`numberOfProduct${id}`).value
    if (valueCount >= 1) {
      valueCount--
      document.getElementById(`numberOfProduct${id}`).value = valueCount
      activeUser.cartItems.map((item) => {
      if (item.productId === id) {
        item.productQuantity = valueCount
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
        setCheckoutItems(activeUser.cartItems)
      }
    })
  }
  }

  const calculateBill = (id) => {
    activeUser.cartItems.map((item) => {
      let sum = 0

      let bill = item.productPrice * item.productQuantity
      let totalbill = []
      totalbill.push(bill)
      //console.log(totalbill)
      for(let i = 0; i<= totalbill.length; i++){
        if(activeUser.cartItems.length === 1){
          sum = bill
        setBill(sum)
        }else{
          sum = sum + bill
        setBill(sum)
        }
      }
    })
  }

  useEffect(() => {
    calculateBill()
    {checkoutItems ? setLoading(false) : setLoading(true)}
  }, [checkoutItems])

  const makePayment = token => {
    const body = {
      token,
      checkoutItems
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch("/payment", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response)
      const {status} = response;
      console.log('STATUS', status);
    }).catch(error => console.log(error))
  }

  return (
    <div>
      <nav id='navbar'>
      <Link to='/registration'>Registeration</Link>
      <Link to={activeUser ? `/logout` : `/login`}>{ activeUser ? 'Logout' : 'Login'}</Link>
      <Link to='/products'>Products</Link>
      <Link to='/checkout'>Checkout</Link>
    </nav>

    {loading ? <Loader /> : null}

    <h2>{activeUser ? `${activeUser.username}, Welcome` : 'You need to Login to continue'}</h2>
    <div className='shop-items'>
      {activeUser.cartItems.map((product) => {
        return (
            <div key={product.productId} className='item'>
              <div className='buttons'>
                <span className='delete-btn' onClick={() => removeProduct(product.productId)}></span>  
              </div> 
              <img src={product.productUrl} alt={product.productName} className='image'/>
              <h3 className='title'>{product.productName}</h3>
              <p className='total-price'>{product.productPrice}</p>
              <div className='cart-quantity' id={`quantityButton${product.productId}`}>
                <button className='plus-btn' onClick={() =>increaseQuantity(product.productId)}> + </button>
                <input type="number" id={`numberOfProduct${product.productId}`} defaultValue={product.productQuantity}/>
                <button className='minus-btn' onClick={() =>decreaseQuantity(product.productId)}> - </button>
              </div>
            </div>
        )
      })}
    </div>

    <div className='title'>Cart</div>
    {activeUser.cartItems.map((product) => {
      return(
        <div className='shopping-cart' key={product.productId}>
          <div className='cart-row'>
            <span className='cart-item-title'>{product.productName}</span>
            <span className='cart-price'>{product.productPrice}</span>
            <div className='cart-quantity' id={`quantityButton${product.productId}`}>
              <input type="number" id={`numberOfProduct${product.productId}`} defaultValue={product.productQuantity}/>
            </div>
         </div>
       </div>
      )
    })}

    <div className='shopping-cart'>
      <h3 className='title'>Total Bill-</h3>
      <span>{bill}</span>
    </div>

    <StripeCheckout 
      stripeKey={process.env.REACT_APP_KEY}
      token={makePayment}
      name='CheckOut'
      //shippingAddress
    >
      <button className='btn'>Pay {bill}</button>
    </StripeCheckout>

    <Maps />

  </div>
  );
}

export default Checkout;


