import React, { useRef, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../fireConfig";
import { AuthContext } from "../provider/AuthContext";
import Header from "../components/Header";

export default function Connection() {
  const userEmail = useRef();
  const userPwd = useRef();
  const logging = useContext(AuthContext);
  let error = null;

  const handleConnection = e => {
    e.preventDefault();
    const email = userEmail.current.value;
    const pwd = userPwd.current.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        logging.isLoggedTrue(email);
      })
      .catch(err => {
        error = err.message;
        console.log("error:", error);
      });
  };

  return logging.isLogged === true ? (
    <Redirect to="/Menu" />
  ) : (
    <React.Fragment>
      <Header title="Connexion" />
      <form className="form connection_form" action="#" method="get">
        <div className="inlineCtn">
          <label className="input_label" htmlFor="email">Email&nbsp;:</label>
          <input className="input_ctn"
            id="email"
            name="email"
            type="email"
            ref={userEmail}
            required
          />
        </div>
        <div className="inlineCtn">
          <label className="input_label" htmlFor="password">Password&nbsp;:</label>
          <input className="input_ctn"
            id="password"
            name="password"
            type="password"
            ref={userPwd}
            required
          />
        </div>
        <div className="btn_container btn_container_connect btn_container_line">
          <button className="btn btn_small" onClick={handleConnection}>
            <span className="link">Confirmer</span>
          </button>
          <button className="btn btn_small_outline">
            <Link className="link" to="/">
              Retour
            </Link>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
