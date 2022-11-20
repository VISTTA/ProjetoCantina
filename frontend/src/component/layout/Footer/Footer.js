import React from 'react'
import telefoneFooter from "../../../images/phone.svg";
import "./Footer.css"
import {ReactComponent as FetechLogo} from "../../../images/ProjetoLogoFetech2.svg";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer  id="footer">
        <div className="leftFooter">
            <h4>Loja Fetech Informática</h4>
            <p>Aqui você irá encontrar algumas notícias do mundo do Hardware e ficará por dentro de todas as novidades.</p>
            <img src={telefoneFooter} alt="telefoneFooter"/>(44) 9 9999-9999.
        </div>

        <div className="midFooter">
          <div className="logoFetech" alt="LogoFetech">
            <FetechLogo width={250}/>
          </div>
          <h1>Unindo Arte em Hardware e Tecnologia</h1>
          <p>Rua Osvaldo Cruz, Maringá-PR, CEP: 87020-200</p>
          <p className='moreInfo'>Mais Informações...</p>
        </div>

        <div className="rightFooter">
            <h4>Redes Sociais</h4>
            <a href="https://www.youtube.com/channel/UCkCI3DxLklu2IJxjN7PixwA" alt="Youtube" target="blank">Youtube {<BsYoutube/>}</a>
            <a href="https://www.instagram.com/fetech.informatica/" alt="Instagram" target="blank">Instagram {<BsInstagram/>}</a>
            <a href="https://www.facebook.com/andre.ferreira.33234" alt="Facebook" target="blank">Facebook {<BsFacebook/>}</a>
            <form className="emailField">
            <input className="novidadeEnvio" type="text" name="email" require="true" placeholder="Digite o seu e-mail..."></input>
            <input className="submitButton" type="submit" value="Enviar"></input>
            </form>
        </div>
    </footer>
  )
}
export default Footer;