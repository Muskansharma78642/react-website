import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { Autocomplete, TextField, Stack } from '@mui/material';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const storedProducts = JSON.parse(localStorage.getItem("products"))
const activeUsers = JSON.parse(localStorage.getItem("activeUser"))
const jwtoken = JSON.parse(localStorage.getItem('jwtoken')) 

const Products = () => {
    const [products, setProducts] = useState(storedProducts)
    const [loading, setLoading] = useState()
    const [activeUser] = useState(activeUsers);
    const [cartQuantity, setCartQuantity] = useState(activeUser ? `${activeUser.cartItems.length}` : `(0)`)
    const [value, setValue] = useState()

    let cataegoriesArray = []
    storedProducts.map((product) => {
      let category = product.productCatagory
      cataegoriesArray.push( category )
    })

    var singleCategories = Array.from(new Set(cataegoriesArray))
    //console.log(singleCategories)

    
    const callProductsPage = async () => {
        try{
          if(!activeUser){
            return( <h2>Please Login to continue shopping</h2>);
          }
          activeUser.tokens.map((token) => {
            if(token !== jwtoken){
              return( <h2>Unauthorized User</h2> );
            }else {
              return(`${activeUser.username}, Welcome`);
            }
          })

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
        
        window.addEventListener('storage', () => {
        setProducts(JSON.parse(localStorage.getItem('products')))

        {products ? setLoading(false) : setLoading(true)}
        });
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
            removeAddButton(id)
            postProducts(activeUser._id, item) 
            setCartQuantity(activeUser.cartItems.length)
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

    var handleCategoryChange = (e) => {
      console.log(e)
      let singleProduct = products.filter(product => product.productCatagory === e.target.value)
      //console.log(singleProduct)
      setProducts(singleProduct)
    }

    var handleChangeInSearchBox = (e) => {
      setLoading(true)
      setValue(e.target.innerHTML)

      if(value === ''){
        setProducts(storedProducts)
      }

      let singleProduct = products.filter(product => product.productName === e.target.innerHTML)
      setProducts(singleProduct)
      setLoading(false)
    }

    return(
      <div>
        <nav id='navbar'>
          <Link to='/registration'>Registeration</Link>
          <Link to={activeUser ? `/logout` : `/login`}>{ activeUser ? 'Logout' : 'Login'}</Link>
          <Link to='/products'>Products</Link>
          <Link to='/checkout'>{activeUser ? `Checkout(${cartQuantity})` : `Checkout(0)`}</Link>
        </nav>

        {loading ? <Loader /> : null}

        <h2>{activeUser ? `${activeUser.username}, Welcome` : 'You need to Login to continue'}</h2>

        <Stack sx={{ width: 300, margin: 'auto' }}>
          <Autocomplete 
          id='searchBox'
          getOptionLabel={(products) => `${products.productName}`}
          options={products}
          defaultValue={value}
          onChange={(e) => handleChangeInSearchBox(e)}
          
          noOptionsText={'No such products available'}
          renderInput ={(params) => <TextField {...params} label="Search Products"/>}
          />
        </Stack>

    <div>
      <select onChange={(e) => handleCategoryChange(e)}>
            {singleCategories.map((product) => {
         return(
           <option key={product.id}>{product}</option>
         );
       })} 
      </select>
    </div>

    <div className='outer-grid'>
      {products.map((product) => {
      if(product.productId % 2 === 0){
        return (
            <div key={product.productId} className='inner-grid'> 
              <h3>{product.productName}</h3>
              <img src={product.productUrl} alt={product.productName} />
              <p>{product.productPrice}</p>
              <span>Catagory-{product.productCatagory}</span>
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
              <span>Catagory-{product.productCatagory}</span>
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