import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header/Header';
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData.js"

const Products = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage, alert, error]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Produtos -- Ecommerce"/>
                    <Header />
                    <h2 className="productsHeading">Produtos</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Proximo"
                                prevPageText="Anterior"
                                firstPageText="1st"
                                lastPageText="Ultimo"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products