import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import bird from "../assets/bird.png";

export default function Home() {
  const logging = useContext(AuthContext);

  return logging.isLogged === true ? (
    <Redirect to="/Menu" />
  ) : (
    <React.Fragment>
      <div className="title_container">
        <img className="logo" src={bird} alt="logo_birdy" />
        <h1 className="main_title">Birdy</h1>
      </div>
      <div className="btn_container btn_container_col">
        <button className="btn btn_big">
          <Link className="link link_big" to="/Connection">Connexion</Link>
        </button>
        <button className="btn btn_big">
          <Link className="link link_big" to="/InscriptionInfo">Inscription</Link>
        </button>
      </div>
    </React.Fragment>
  );
}
