//import React, { useState, useRef, Fragment } from 'react'
//import { Link } from "react-router-dom";
//import { Button } from "./Buttom.js";
import { ReactComponent as LogoFetech } from "../../../images/ProjetoLogoFetech2.svg";
import "./Navbar.css";
//import Search from '../../Product/Search.js';

const Navbar = () => {
  //const dropDownRef = useRef(null);
  //const [isActive, setIsActive] = useState(false);
  //const onClick = () => setIsActive(!isActive);

  return (
    //NavBar for Project Apresentation
    <nav id="navbar" alt="NavBar">
      <div className="navbar">
        <div className="LogoFetech" alt="LogoFetech" title="Logo Fetech Informática"><LogoFetech width={150} /></div>
      </div>
    </nav>
  )
}

export default Navbar;