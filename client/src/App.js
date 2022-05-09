import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousal from "./components/ImageCarousal";
import './App.css';


const App=()=> {
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
