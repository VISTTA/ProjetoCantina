import React, { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux";
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader.js"
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    };
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>Meu perfil</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Editar perfil.</Link>
            </div>
            <div>
              <div>
                <h4>Nome completo</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Entrou em</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">Meus pedidos</Link>
                <Link to="/password/update">Mudar senha</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profile;