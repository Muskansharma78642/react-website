import React, { useState, useEffect } from 'react';
import './style.css';

const storedProducts = JSON.parse(localStorage.getItem("products"))
    //const activeUser = JSON.parse(localStorage.getItem("activeUser"))

const Products = () => {
    const [products, setProducts] = useState(storedProducts)
    const [activeUser, setActiveUser] = useState();
    const [cartQuantity, setCartQuantity] = useState({})
    //console.log(products)

    const callProductsPage = async () => {
        try{
            const res = await fetch('/product', {
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });
            const activeUser = await res.json();
            setActiveUser(activeUser)
            setCartQuantity(activeUser.cartItems.length)
            localStorage.setItem("activeUser", JSON.stringify(activeUser))

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
        }
    }
    //console.log(activeUser)

    const postProducts = async( _id, item ) => {
      console.log(_id, item)
      const res = await fetch('/product', {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({_id, item})
      });
      const data = await res.json();

      if(!data) {
        console.log("Products could not be stored on DB")
      }else {
        console.log("Products stored successfully")
        console.log(data)
      }
    }

    useEffect(() => {
        callProductsPage();
    },[activeUser])

    const addProduct = async (id) => {
        console.log(id)
        products.map((item) => {
          if(item.productId === id){
            let selectedProduct = {
              id: item.productId,
              name: item.productName,
              quantity: 1,
            }
            activeUser.cartItems.push(item)
            activeUser.products.push(selectedProduct)
            localStorage.setItem("activeUser", JSON.stringify(activeUser)) 
            setCartQuantity(activeUser.cartItems.length)
            removeAddButton(id)
            postProducts(activeUser._id, item) 
          }
        })

    }

    const increaseQuantity = (id) => {
        var number = document.getElementById(`numberOfProduct${id}`).value
        if(number >= 1){
          number++
          document.getElementById(`numberOfProduct${id}`).value = number
          activeUser.cartItems.map((item) => {
            if(item.productId === id){
              item.productQuantity = number
              localStorage.setItem("activeUser", JSON.stringify(activeUser))
            //postProducts(activeUser._id, item) 
            }
          })
        }  
    }

    const decreaseQuantity = (id) => {
        var number = document.getElementById(`numberOfProduct${id}`).value
        if(number >= 1){
          number--
          document.getElementById(`numberOfProduct${id}`).value = number
          activeUser.cartItems.map((item) => {
            if(item.productId === id){
              item.productQuantity = number
              localStorage.setItem("activeUser", JSON.stringify(activeUser))
            //postProducts(activeUser._id, item) 
            }
          })
        }
    }

    const removeAddButton = (id) => {
        activeUser.products.map((item) => {
           let button1 = document.getElementById(`addButton${item.id}`)
             let button2 = document.getElementById(`quantityButton${item.id}`)

             if(item.id === id){
              if (item.quantity <= 0) {
                button1.style.display = "block"
                button2.style.display = "none"
              } else if (item.quantity >= 1) {
                button1.style.display = "none";
                button2.style.display = "block"
            }
            }
        })
    }


    return(
        <div>
      <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href={activeUser ? `./logout` : `./login`}>{ activeUser ? 'Logout' : 'Login'}</a>
      <a href='./products'>Products</a>
      <a href='./checkout'>{activeUser ? `Checkout(${cartQuantity})` : `Checkout(0)`}</a>

    </nav>
    { activeUser ? <h3>{`${activeUser.username}, Welcome!`}</h3> : <h3>You need to login to Shop!</h3>}
    <div className='outer-grid'>
      {products.map((product) => {
      if(product.productId % 2 === 0){
        return (
            <div key={product.productId} className='inner-grid'> 
              <h3>{product.productName}</h3>
              <img src={product.productUrl} alt={product.productName} />
              <p>{product.productPrice}</p>
              <button className='btn' id={`addButton${product.productId}`} onClick={() => addProduct(product.productId)}>Add Product</button>
              <div className='quantity' id={`quantityButton${product.productId}`}>
                <button className='plus-btn' onClick={() =>increaseQuantity(product.productId)}> + </button>
                <input type="number" id={`numberOfProduct${product.productId}`} defaultValue={1}/>
                <button className='minus-btn' onClick={() =>decreaseQuantity(product.productId)}> - </button>
              </div>
            </div>
        )
      }else {
        return (
            <div key={product.productId} className='inner-grid'> 
              <h3>{product.productName}</h3>
              <img src={product.productUrl} alt={product.productName} />
              <p>{product.productPrice}</p>
              <button className='btn' id={`addButton${product.productId}`} onClick={() => addProduct(product.productId)}>Add Product</button>
              <div className='quantity' id={`quantityButton${product.productId}`}>
                <button className='plus-btn' onClick={() => increaseQuantity(product.productId)}> + </button>
                <input type="number" id={`numberOfProduct${product.productId}`} defaultValue={1}/>
                <button className='minus-btn' onClick={() => decreaseQuantity(product.productId)}> - </button>
              </div>
            </div>
          )
        }
      })}
    </div>
    </div>
    );
}

export default Products;