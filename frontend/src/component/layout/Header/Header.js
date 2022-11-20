import React from 'react';
import LogoFetech from "../../../images/ProjetoLogoFetech2.svg";
import "../Header/Header.css"
import { useState, useRef } from "react";
import Search from '../../Product/Search';
import Buttom from '../Navbar/Buttom';
//import CheckOutsideClick from './CheckOutsideClick';

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
        <img src={LogoFetech} width={180} className="Header-Logo" alt="logo" title="Logo Fetech Informática" />
        <button
          onClick={onButtonClick}
          onBlur={onButtonBlur}
          className="menu-buttom"
          title="Compre por Departamento">
          <span>Compre por departamento</span>
        </button>
        <nav ref={dropDownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
          <div id="ulDropDown" alt="UL DropDown" title="Lista" onPointerEnter={() => navFocus(true)} onPointerLeave={() => navFocus(false)}>
            <ul>
              <li>
                <a className="list" href="/">Promoções</a>
              </li>
              <li>
                <a className="list" href="/">Kits Upgrades</a>
              </li>
              <li>
                <a className="list" href="/">PC Gamer</a>
              </li>
              <li>
                <a className="list" href="/">Hardware</a>
              </li>
              <li>
                <a className="list" href="/">Notebooks</a>
              </li>
              <li>
                <a className="list" href="/">Periféricos</a>
              </li>
              <li>
                <a className="list" href="/">Gabinete</a>
              </li>
              <li>
                <a className="list" href="/">Monitores</a>
              </li>
              <li>
                <a className="list" href="/">Cadeira Gamer</a>
              </li>
              <li>
                <a className="list" href="/">Rede e Internet</a>
              </li>
              <li>
                <a className="list" href="/">Segurança</a>
              </li>
              <li>
                <a className="list" href="/products">Listar Todos Os Produtos </a>
              </li>
            </ul>
          </div>
        </nav>
        <Search />
        <Buttom />
      </div>
    </header>
  );
};
export default Header;