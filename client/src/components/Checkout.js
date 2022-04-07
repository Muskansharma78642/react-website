import React, { useState } from 'react';
import './style.css';

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

const Checkout = () => {
  const [bill, setBill] = useState(0)
  
  const removeProduct = (id) => {
    activeUser.cartItem.map((item) => {
      if (item.productId === id) {
        let newProducts = activeUser.cartItem.filter(x => x.productId !== id)
        activeUser.cartItem = newProducts
        console.log(newProducts)
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
      }
    })
      window.location.reload()
      //calculateBill(id)
  }
  const increaseQuantity = (id) => {
    var valueCount = document.getElementById(`numberOfProduct${id}`).value
    if (valueCount >= 1) {
      valueCount++
      document.getElementById(`numberOfProduct${id}`).value = valueCount
      activeUser.cartItem.map((item) => {
      if (item.productId === id) {
        item.productQuantity = valueCount
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
      }
    })
      window.location.reload()
      //calculateBill(id)
  }
  }
  const decreaseQuantity = (id) => {
    var valueCount = document.getElementById(`numberOfProduct${id}`).value
    if (valueCount >= 1) {
      valueCount--
      document.getElementById(`numberOfProduct${id}`).value = valueCount
      activeUser.cartItem.map((item) => {
      if (item.productId === id) {
        item.productQuantity = valueCount
        localStorage.setItem("activeUser", JSON.stringify(activeUser))
        setBill(item.productQuantity * item.productPrice)
      }
    })
      window.location.reload()
      //calculateBill(id)
  }
  }

  const calculateBill = (id) => {
    activeUser.cartItem.map((item) => {
      let sum = 0

      let bill = item.productPrice * item.productQuantity
      let totalbill = []
      totalbill.push(bill)
      console.log(totalbill)
      for(let i = 0; i<= totalbill.length; i++){
        sum = sum + bill
        setBill(sum)
      }
    })
  }

  window.onload = calculateBill

  return (
    <div>
      <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href='./login'>Logout</a>
      <a href='./products'>Products</a>
      <a href='./checkout'>Checkout</a>
    </nav>
    <div className='shop-items'>
      {activeUser.cartItem.map((product) => {
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
    {activeUser.cartItem.map((product) => {
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
  </div>
  );
}

export default Checkout;
