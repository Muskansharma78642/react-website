import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import ImageCarousal from './components/ImageCarousal'

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

function App() {
    return(
      <>
        <nav id='navbar'>
          <a href='./registration'>Registeration</a>
          <a href='./login'>Login</a>
          <a href='./products'>Products</a>
          <a href='./checkout'>Checkout</a>
        </nav>
        <h2>Today's Featured products -</h2>
        <ImageCarousal />
      </>
    );
}

export default App;
