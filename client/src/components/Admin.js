import React, { useState, useEffect } from 'react';
import './style.css';


let activeUser = JSON.parse(localStorage.getItem("activeUser"))

let data = {
    products: [{
            productId: 1,
            productName: "Office Chair",
            productUrl: "https://m.media-amazon.com/images/I/71sjjcwJ6cL._SY741_.jpg",
            productPrice: 18999,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 2,
            productName: "Bed",
            productUrl: "https://m.media-amazon.com/images/I/81o2OnCoRqL._SY355_.jpg",
            productPrice: 7199,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 3,
            productName: "Bean Bag",
            productUrl: "https://m.media-amazon.com/images/I/61CiyGIeoOL._SY355_.jpg",
            productPrice: 759,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 4,
            productName: "L Shaped Sofa",
            productUrl: "https://m.media-amazon.com/images/I/91tMzaIomiL._SY355_.jpg",
            productPrice: 36999,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 5,
            productName: "Shoe Rack",
            productUrl: "https://m.media-amazon.com/images/I/71ieGBHQcwL._SL1500_.jpg",
            productPrice: 6899,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 6,
            productName: "Wall Shelf",
            productUrl: "https://m.media-amazon.com/images/I/81BTNsT-N-L._SX425_.jpg",
            productPrice: 1153,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 7,
            productName: "Cabinets",
            productUrl: "https://m.media-amazon.com/images/I/712qwqa+qSL._SY355_.jpg",
            productPrice: 12999,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 8,
            productName: "Book Shelf",
            productUrl: "https://m.media-amazon.com/images/I/71+XBrXXSXL._SX425_.jpg",
            productPrice: 899,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 9,
            productName: "Stool",
            productUrl: "https://m.media-amazon.com/images/I/51+iXH3iCrL._SY450_.jpg",
            productPrice: 1966,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 10,
            productName: "Rocking chair",
            productUrl: "https://m.media-amazon.com/images/I/7158Jn4C62L._SX425_.jpg",
            productPrice: 15999,
            productCatagory: "Furniture",
            productOwner: "XFurniture",
            productQuantity: 1
        },
        {
            productId: 11,
            productName: "Flowers Plants for Home Decor",
            productUrl: "https://m.media-amazon.com/images/I/71P+Qtin7DL._SX425_.jpg",
            productPrice: 345,
            productCatagory: "Decor",
            productOwner: "Decore",
            productQuantity: 1
        },
         {
            productId: 12,
            productName: "Plant Bush",
            productUrl: "https://images-eu.ssl-images-amazon.com/images/I/51U0--E6rkL._SX300_SY300_QL70_FMwebp_.jpg",
            productPrice: 546,
            productCatagory: "Decor",
            productOwner: "Decore",
            productQuantity: 1
        },
         {
            productId: 13,
            productName: "Artificial Bonsai",
            productUrl: "https://m.media-amazon.com/images/I/51UKeGR1WPS._SX450_.jpg",
            productPrice: 1299,
            productCatagory: "Decor",
            productOwner: "Decore",
            productQuantity: 1
        },
        {
            productId: 14,
            productName: "Coated Framed Painting",
            productUrl: "https://m.media-amazon.com/images/I/71rRmg4mpdL._SX355_.jpg",
            productPrice: 269,
            productCatagory: "Fine-Art",
            productOwner: "Fine-Art",
            productQuantity: 1
        },
        {
            productId: 15,
            productName: "Rainy Umbrella Modern Art",
            productUrl: "https://m.media-amazon.com/images/I/718CXJTyz7L._SX355_.jpg",
            productPrice: 15999,
            productCatagory: "Fine-Art",
            productOwner: "Fine-Art",
            productQuantity: 1
        },
        {
            productId: 16,
            productName: "Rose flowers water color painting",
            productUrl: "https://m.media-amazon.com/images/I/61mMtt1NEhL._SY450_.jpg",
            productPrice: 5000,
            productCatagory: "Fine-Art",
            productOwner: "Fine-Art",
            productQuantity: 1
        },
         {
            productId: 17,
            productName: "Wind Chime",
            productUrl: "https://m.media-amazon.com/images/I/61mfWIQhphL._SY450_.jpg",
            productPrice: 999,
            productCatagory: "Decor",
            productOwner: "Decore",
            productQuantity: 1
        },
         {
            productId: 19,
            productName: "Wooden Garden Tool Set",
            productUrl: "https://m.media-amazon.com/images/I/71TbUlqIB8L._SY450_.jpg",
            productPrice: 579,
            productCatagory: "Gardening tools",
            productOwner: "Gardening",
            productQuantity: 1
        },
         {
            productId: 20,
            productName: "Solar Fairy light",
            productUrl: "https://m.media-amazon.com/images/I/71FU2izMLCL._SY450_.jpg",
            productPrice: 855,
            productCatagory: "Solar Gadgets",
            productOwner: "Solaris",
            productQuantity: 1
        },
         {
            productId: 21,
            productName: "Solar Garden Stake Light",
            productUrl: "https://m.media-amazon.com/images/I/618XPw53QbL._SY450_.jpg",
            productPrice: 960,
            productCatagory: "Solar Gadgets",
            productOwner: "Solaris",
            productQuantity: 1
        },
         {
            productId: 22,
            productName: "Hardoll Solar Lights",
            productUrl: "https://m.media-amazon.com/images/I/51OBdx5vRpL._SY450_.jpg",
            productPrice: 370,
            productCatagory: "Solar Gadgets",
            productOwner: "Solaris",
            productQuantity: 1
        },
         {
            productId: 23,
            productName: "Solar String Lights",
            productUrl: "https://m.media-amazon.com/images/I/61yK3w4vzLL._SY450_.jpg",
            productPrice: 747,
            productCatagory: "Solar Gadgets",
            productOwner: "Solarix",
            productQuantity: 1
        },
         {
            productId: 24,
            productName: "Butterfly Waterproof Lamp",
            productUrl: "https://m.media-amazon.com/images/I/61Bityj5fCL._SX466_.jpg",
            productPrice: 666,
            productCatagory: "Solar Gadgets",
            productOwner: "Solarix",
            productQuantity: 1
        },
    ],
};

localStorage.setItem("products", JSON.stringify(data.products))

var stored_product = JSON.parse(localStorage.getItem("products"))
//console.log(stored_product)


const Admin = () => {
    const [formValues, setFormValues] = useState({
        productCatagory:"",
        productId: undefined,
        productName:"",
        productOwner:"",
        productPrice: undefined,
        productQuantity: undefined,
        productUrl:"",
    })

    const [products,setProducts] = useState(stored_product)
    const [formErrors, setFormErrors] = useState({})
    const [input, setInput] = useState('')

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      console.log(formValues);
      setFormErrors(validate(formValues));
      storeProductsInLocalstorage(formValues)
    };

    const validate = (values) => {
    const errors = {};
    if (!values.productCatagory) {
      errors.productCatagory = "Product Catagory is required!";
    } 

    if (!values.productName) {
      errors.productName = "Product Name is required!";
    } 

    if (!values.productOwner) {
      errors.productOwner = "Product Owner is required";
    }

    if (!values.productPrice) {
      errors.productPrice = "Product Price is required";
    }

    if (!values.productQuantity) {
      errors.productQuantity = "Product Quantity is required";
    }

    if (!values.productUrl) {
      errors.productUrl = "Produc tUrl is required";
    }
    
    return errors;
    };

  const storeProductsInLocalstorage = (values) => {
    const productId = Math.floor(Math.random() * 100000) + 1
    console.log(productId)
    const storeProduct = { ...values, productId}
    console.log(storeProduct)
    stored_product.push(storeProduct)
    localStorage.setItem("products", JSON.stringify(stored_product))
  }

  const removeItem = (id) => {
    products.map((item) => {
      if (item.productId === id) {
        let newProducts = products.filter(x => x.productId !== id)
        //console.log(newProducts)
        setProducts(newProducts)
        localStorage.setItem("products", JSON.stringify(newProducts))
      }
    })
  }

  const saveChanges = (id, name, value) => {
    console.log("save changes")
    products.map((product) => {
      if(product.productId === id){
        const newProducts = {...product ,[name]: value}
        console.log(newProducts)
        localStorage.setItem("products", JSON.stringify(products))
      }
    })
  }
 
  const handleNameChange = (id, e) => {
    console.log(e.target)
    products.map((item) => {
      if(item.productId === id) {
        item.productName = e.target.value
        setInput(e.target.value)
        //saveChanges(id, e.target.name, e.target.value)
      }
    })
  }

  const handleCatagoryChange = (id, e) => {
    console.log(e.target)
    products.map((item) => {
      if(item.productId === id) {
        item.productCatagory = e.target.value
        setInput(e.target.value)
        //saveChanges(id, e.target.name, e.target.value)
      }
    })
  }

  const handlePriceChange = (id, e) => {
    console.log(e.target)
    products.map((item) => {
      if(item.productId === id) {
        item.productPrice = e.target.value
        setInput(e.target.value)
        //saveChanges(id, e.target.name, e.target.value)
      }
    })
  }

  const handleQuantityChange = (id, e) => {
    console.log(e.target)
    products.map((item) => {
      if(item.productId === id) {
        item.productQuantity = e.target.value
        setInput(e.target.value)
        //saveChanges(id, e.target.name, e.target.value)
      }
    })
  }

  const handleUrlChange = (id, e) => {
    console.log(e.target)
    products.map((item) => {
      if(item.productId === id) {
        item.productUrl = e.target.value
        setInput(e.target.value)
        //saveChanges(id, e.target.name, e.target.value)
      }
    })
  }

  useEffect(() => {
        window.addEventListener('storage', () => {
        setProducts(JSON.parse(localStorage.getItem('products')))   
        });
    },[products, formValues])

  return (
    <div>
      <nav id='navbar'>
        <a href='./registration'>Registeration</a>
        <a href={activeUser ? `./logout` : `./login`}>{ activeUser ? 'Logout' : 'Login'}</a>
        <a href='./products'>Products</a>
        <a href='./checkout'>Checkout</a>
      </nav>

      <h2>Enter All the details of the New product to be added</h2>
      
      <div>
        <form method='POST' className='container'>
          <div className="field">
            <label>Product Name</label>
            <input
              type="text" name="productName" placeholder="Product Name"
              value={formValues.productName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productName}</p>

          <div className="field">
            <label>Product Category</label>
            <input
              type="text" name="productCatagory" placeholder="Product Category"
              value={formValues.productCatagory}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productCatagory}</p>

          <div className="field">
            <label>Product Quantity</label>
            <input
              type="number" name="productQuantity" placeholder="Product Quantity"
              value={formValues.productQuantity}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productQuantity}</p>

          <div className="field">
            <label>Product Price</label>
            <input
              type="number" name="productPrice" placeholder="Product Price"
              value={formValues.productPrice}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productPrice}</p>

          <div className="field">
            <label>Product Owner</label>
            <input
              type="text" name="productOwner" placeholder="Product Owner"
              value={formValues.productOwner}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productOwner}</p>

          <div className="field">
            <label>Product Image URL</label>
            <input
              type="text" name="productUrl" placeholder="Image Url"
              value={formValues.productUrl}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.productUrl}</p>

          <button className="btn" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
      </div>

      <div>
        <h2>List of already stored products</h2>
        {products.map((product) => {
          return( 
            <div className='item' key={product.productId}>
              <input type="text" name='productName' value={product.productName} onChange={(e) => {handleNameChange(product.productId, e)}} />
              <input type="text" name='productCategory' value={product.productCatagory} onChange={(e) => {handleCatagoryChange(product.productId, e)}}/>
              <input type="number" name='productPrice' value={product.productPrice} onChange={(e) => {handlePriceChange(product.productId, e)}}/>
              <input type="number" name='productQuantity' value={product.productQuantity} onChange={(e) => {handleQuantityChange(product.productId, e)}}/>
              <input type="text" name='productUrl' value={product.productUrl} onChange={(e) => {handleUrlChange(product.productId, e)}}/>
              <button className='btn' onClick={() => removeItem(product.productId)}>Remove</button>
              <button className='btn' onClick={(e) => saveChanges(product.productId, e.target.name, e.target.value)}>Save Changes</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
