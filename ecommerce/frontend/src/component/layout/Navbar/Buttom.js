import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Buttom.css";

const Buttom = () => {
    const [isActive, setIsActive] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.user);

    const loginForm = ({ state }) => {
        if (isAuthenticated) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loginForm(true);
        } else {
            loginForm(false);
        }
    })

    return (
        <div className={isActive ? "buttonLoginFormUser" : "buttonLogin"}>
            <Link to="/login" className="ButtonLogin" type="text">
                <FaUserCircle className="iconUser" />
            </Link>
            <p className="conta">Minha Conta</p>
        </div >
    )
}

export default Buttom;