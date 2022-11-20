import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css"

const ProductCard = ({ product }) => {
  const options = {
    edit: false, 
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
};
  return (
    <Fragment>
      <div id="product">
        <Link className="productCard" to={`/product/${product._id}`}>
          <div className="contadorPromocao" alt="contadorPromocao" >
            <span className="OFF">50% OFF</span>
            <span>TesteContador</span>
          </div>
            <img src={product.images[0].url} alt={product.name} />
            <p className="productName">{product.name}</p>
            <div>
                <ReactStars {...options} />{" "}
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span className="oldPrice">De {`R$ ${product.oldPrice}`} por</span>
            <span className="productPrice">{`R$ ${product.price}`} Preço à vista.</span>
            <span className="installmmentPrice">ou em 12x de {` R$ ${product.installmmentPrice}`} sem juros.</span>
        </Link>
        <button className="buttomCard" value="">Adcionar ao Carrinho.</button>
      </div>
    </Fragment>
  );
};

export default ProductCard;