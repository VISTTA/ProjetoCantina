import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Loader from "./component/layout/Loader/Loader.js";
import Products from "./component/Product/Products.js";
import  Search  from "./component/Product/Search.js";
import { LoginSignUp } from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";

export default function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sad" element={<Loader/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />}/>
            <Route path="/password/reset/:token" element={<ResetPassword />}/>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    );
}