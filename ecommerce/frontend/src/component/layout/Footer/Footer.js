import React from 'react'
import telefoneFooter from "../../../images/phone.svg";
import "./Footer.css"
import { ReactComponent as LogoEmpresa } from "../../../images/LogoEmpresa.svg";
import PagamentoEmpresa from "../../../images/pagamento.svg";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Cantina do Emerson</h4>
        <p>Aqui você irá encontrar diversos produtos que irão saborear sua vida.</p>
        <img src={telefoneFooter} alt="telefoneFooter" />(44) 9 9700-9147.
      </div>

      <div className="midFooter">
        <div className="logoFetech" alt="LogoFetech">
          <LogoEmpresa width={250} />
        </div>
        <h1>Unindo todos com um belo café.</h1>
        <p>Rodovia PR-317, 298, Km 01 Zona 42, Maringá - PR, 87065-005</p>
        <p className='moreInfo'>Mais Informações...</p>
      </div>
      <div className="rightFooter">
        <h4>Redes Sociais</h4>
        <a href="https://www.youtube.com/channel/UCkCI3DxLklu2IJxjN7PixwA" alt="Youtube" target="blank">Youtube {<BsYoutube />}</a>
        <a href="https://www.facebook.com/andre.ferreira.33234" alt="Facebook" target="blank">Facebook {<BsFacebook />}</a>
        <form className="emailField">
          <input className="novidadeEnvio" type="text" name="email" require="true" placeholder="Digite o seu e-mail..."></input>
          <input className="submitButton" type="submit" value="Enviar"></input>
        </form>
        <img src={PagamentoEmpresa} alt="Forma de pagamento" />
      </div>
    </footer>
  )
}
export default Footer;