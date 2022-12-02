import React from 'react';
import LogoEmpresa from "../../../images/LogoEmpresa.svg";
import "../Header/Header.css"
import { useState, useRef } from "react";
import Search from '../../Product/Search';
import Buttom from '../Navbar/Buttom';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [listaFocused, setListaFocused] = useState(false);
  const onButtonClick = () => {
    toggleDropMenu();
  }

  const onButtonBlur = () => {
    if (isActive && !listaFocused) {
      toggleDropMenu()
    }
  }

  const dropDownRef = useRef(null);

  const toggleDropMenu = () => {
    setIsActive(prev => !prev)
  }

  const navFocus = (focus) => {
    setListaFocused(focus);
  }

  return (
    <header>
      <div className="nav-area">
        <Search />
        <img src={LogoEmpresa} width={180} className="Header-Logo" alt="logo" title="Logo Cantina" />
        <button
          onClick={onButtonClick} 
          onBlur={onButtonBlur}
          className="menu-buttom"
          title="Produtos Diversos">
          <span>Produtos Diversos</span>
        </button>
        <nav ref={dropDownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
          <div id="ulDropDown" alt="UL DropDown" title="Lista" onPointerEnter={() => navFocus(true)} onPointerLeave={() => navFocus(false)}>
            <ul>
              <li>
                <a className="list" href="/">Promoções</a>
              </li>
              <li>
                <a className="list" href="/products">Listar Todos Os Produtos </a>
              </li>
            </ul>
          </div>
        </nav>
        <Buttom />
      </div>
    </header>
  );
};
export default Header;