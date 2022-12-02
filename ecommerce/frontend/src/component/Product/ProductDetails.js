import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from "react-alert"
import Header from '../layout/Header/Header.js';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1)
      return;
    const qty = quantity - 1;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity));
    alert.success("Item adcionado ao carrinho.");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} --Ecommerce`} />
          <nav id="navBar">
            <Header></Header>
          </nav>
          <div className="ProductDetails">
            <div className="ProductDetailsImage">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="ProductDetailsSale">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`R$ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Adcionar ao Carrinho</button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Sem Estoque" : "Em Estoque"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Descrição do Produto: <p>{product.description}</p>
              </div>
              <button className="submitReview">Enviar Comentário</button>
            </div>
          </div>


          <h3 className="reviewsHeading">COMENTÁRIOS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">Sem Reviews</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;