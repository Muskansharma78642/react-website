import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'

const products = JSON.parse(localStorage.getItem('products'))

const ImageCarousal = () => {
  let settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        cssEase: 'linear',
        lazyLoad: true,
        arrows: true
    };
  return (
    <>
     <div className="App">
       <Slider {...settings}>
         {products.map((product) => {
           if(product.productPrice < 8000){
             return(
             <div key={product.productId} className="slick-slide">
               <h3 className="slick-slide-title">{product.productName}   <span className="slick-slide-label">{product.productPrice}</span> </h3>
               <img  src={product.productUrl} alt={product.productName} className="slick-slide-image"/>
             </div>
            );
           }
         })}
       </Slider>
     </div>
    </>
  );
}

export default ImageCarousal;
