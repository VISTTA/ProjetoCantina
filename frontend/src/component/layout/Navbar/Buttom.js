import React from 'react'
import { Link } from "react-router-dom"
import "./Buttom.css";


const Buttom = () => {

    return (
        <div className="buttonLogin">
            <Link to="/login" className="ButtonLogin" type="text">Entrar
            </Link>
        </div>
    )
}
export default Buttom;