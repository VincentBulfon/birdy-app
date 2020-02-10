import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import Header from "./Header";

export default function Menu(props) {
  const { isLoggedFalse } = useContext(AuthContext);
  const handleLogOut = e => {
    e.preventDefault();
    isLoggedFalse();
  };
  return (
    <React.Fragment>
      <Header title="Menu" />
      <div className="sync_container">
        <h3 className="title_h3">Statut de la synchronisation&nbsp;:</h3>
        <span className="sync_status">En attente</span>
        <p className="sync_info">
          La synchronisation en ligne peut être effecutée à tout moment
          manuellement avec boutton ci-dessous tant que vous disposez d'une
          connexion internet.
        </p>
      </div>
      <div className="menu">
        <button className="menu_btn btn_catch">
          <Link className="menu_link" to="/Catches">
            Captures
          </Link>
        </button>
        <button className="menu_btn btn_map">
          <Link className="menu_link" to="/Map">Carte des sites</Link>
        </button>
        <button className="menu_btn btn_list">
          <Link className="menu_link" to="/Lists">Listes utilisateurs/captures</Link>
        </button>
        <button className="menu_btn btn_encyclo">
          <Link className="menu_link" to="/Encyclopedia">Encyclopédie</Link>
        </button>
        <button className="menu_btn btn_sync" /**add handle click here*/>
          <Link className="menu_link" to="">Synchronisation en ligne</Link>
        </button>
        <button className="menu_btn btn_out" onClick={handleLogOut}>
          <Link className="menu_link" to="">Déconnexion</Link>
        </button>
      </div>
    </React.Fragment>
  );
}
