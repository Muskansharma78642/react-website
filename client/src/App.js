import logo from './logo.svg';
import './App.css';

let data = {
    users: [{
            userId: '1',
            firstName: "xxx",
            lastName: "xxx",
            email: "xxx@gmail.com",
            phone: "1234567890",
            address: "x street",
            password: "qwerty",
            confirmPassword: "qwerty",
            cartItem: [],
            totalAmount: [],
            product: []
        },
        {
            userId: '2',
            firstName: "yyy",
            lastName: "yyy",
            email: "yyy@gmail.com",
            phone: "2345678901",
            address: "y street",
            password: "abcd",
            confirmPassword: "abcd",
        },
        {
            userId: "3",
            firstName: "zzz",
            lastName: "zzz",
            email: "zzz@gmail.com",
            phone: "3456789012",
            address: "z street",
            password: "abcde",
            confirmPassword: "abcde",
        },
        {
            userId: "4",
            firstName: "aaa",
            lastName: "aaa",
            email: "aaa@gmail.com",
            phone: "4567890123",
            address: "a street",
            password: "abcdef",
            confirmPassword: "abcdef",
        },
        {
            userId: "5",
            firstName: "bbb",
            lastName: "bbb",
            email: "xxx@gmail.com",
            phone: "5678901234",
            address: "b street",
            password: "abcdefg",
            confirmPassword: "absdefg",
        },
    ],
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
    ],
};

localStorage.setItem("users", JSON.stringify(data.users))
localStorage.setItem("products", JSON.stringify(data.products))

function App() {
  return (
    <nav id='navbar'>
      <a href='./registration'>Registeration</a>
      <a href='./login'>Login</a>
      <a href='./products'>Products</a>
      <a href='./checkout'>Checkout</a>
    </nav>
  );
}

export default App;
