import React, { useState, useEffect } from 'react';
import './style.css';

const storedProducts = JSON.parse(localStorage.getItem("products"))
    //const activeUser = JSON.parse(localStorage.getItem("activeUser"))

const Products = () => {
    const [products, setProducts] = useState(storedProducts)
    const [activeUser, setActiveUser] = useState();
        //const [cartQuantity, setCartQuantity] = useState(activeUser.cartItem.length)
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
            console.log(activeUser)
            setActiveUser(activeUser)

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callProductsPage();
    },[])

    const addProduct = (id) => {
        // console.log(id)
        // products.map((item) => {
        //   if(item.productId === id){
        //     let selectedProduct = {
        //       id: item.productId,
        //       name: item.productName,
        //       quantity: 1,
        //     }
        //     activeUser.cartItem.push(item)
        //     activeUser.product.push(selectedProduct)
        //     localStorage.setItem("activeUser", JSON.stringify(activeUser)) 
        //     setCartQuantity(activeUser.cartItem.length)
        //     removeAddButton(id)
        //   }
        // })

    }

    const increaseQuantity = (id) => {
        // var number = document.getElementById(`numberOfProduct${id}`).value
        // if(number >= 1){
        //   number++
        //   document.getElementById(`numberOfProduct${id}`).value = number
        //   activeUser.cartItem.map((item) => {
        //     if(item.productId === id){
        //       item.productQuantity = number
        //       localStorage.setItem("activeUser", JSON.stringify(activeUser))
        //     }
        //   })
        // }  
    }

    const decreaseQuantity = (id) => {
        // var number = document.getElementById(`numberOfProduct${id}`).value
        // if(number >= 1){
        //   number--
        //   document.getElementById(`numberOfProduct${id}`).value = number
        //   activeUser.cartItem.map((item) => {
        //     if(item.productId === id){
        //       item.productQuantity = number
        //       localStorage.setItem("activeUser", JSON.stringify(activeUser))
        //     }
        //   })
        // }
    }

    const removeAddButton = (id) => {
        // activeUser.product.map((item) => {
        //    let button1 = document.getElementById(`addButton${item.id}`)
        //      let button2 = document.getElementById(`quantityButton${item.id}`)

        //      if(item.id === id){
        //       if (item.quantity <= 0) {
        //         button1.style.display = "block"
        //         button2.style.display = "none"
        //       } else if (item.quantity >= 1) {
        //         button1.style.display = "none";
        //         button2.style.display = "block"
        //     }
        //     }
        // })
    }

    //  <a href='./checkout'>{`Checkout(${cartQuantity})`}</a>



    return(
        <div>
      <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href='./login'>{ activeUser ? 'Logout' : 'Login'}</a>
      <a href='./products'>Products</a>
    </nav>
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