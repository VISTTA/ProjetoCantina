import React, { Fragment, useEffect } from 'react';
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import Navbar from "../layout/Navbar/Navbar.js";
import Header from '../layout/Header/Header.js';
import ImgSection from "../../images/wallpaperLoja2.png"

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {

    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title="Loja Fetech | Entre já para o mundo gamer" />
          {/*<div className="banner">
            <p> Seja Bem Vindo | Ecommerce Fetech</p>
              <a href="#navBar">
                  <button >
                  Scroll
                  </button>
              </a>
        </div>

        <nav className="navBar" alt="NavBar">
          <Navbar>
          </Navbar>
        </nav> */}

          <nav id="navBar">
            <Header></Header>
          </nav>

          <section className="sliderPrincipal">
            <div id="container">
              <div className="imagemWall">
                <img src={ImgSection} className="imagemPapel" alt="Imagem Slider"/>
              </div>
            </div>
          </section>

          <h2 className="homeHeading" alt="Product Most Wanted" title="Produtos Mais Procurados">Produtos Mais Procurados</h2>

          <div className="container" id="container" alt="Container de Produtos" title="Card de Produtos">
            {products && products.map((product) => <Product product={product} />)};
          </div>
        </React.Fragment>
      )};
    </Fragment>
  );
};
export default Home;