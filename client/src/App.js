import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousal from "./components/ImageCarousal";
import './App.css';
import { Link } from 'react-router-dom'


const App=()=> {
    return(
      <>
        <nav id='navbar'>
          <Link to='/registration'>Registeration</Link>
          <Link to='/login'>Login</Link>
          <Link to='/products'>Products</Link>
          <Link to='/checkout'>Checkout</Link>
        </nav>
        <h2>Today's Featured products -</h2>
        <ImageCarousal />
      </>
    );
}

export default App;
