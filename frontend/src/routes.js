import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Loader from "./component/layout/Loader/Loader.js";
import Products from "./component/Product/Products.js";
import  Search  from "./component/Product/Search.js";
import { LoginSignUp } from "./component/User/LoginSignUp.js";

export default function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sad" element={<Loader/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
        </Routes>
    );
}