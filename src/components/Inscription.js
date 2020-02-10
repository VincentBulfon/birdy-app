import React, { useRef, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase, { auth } from "../fireConfig";
import { AuthContext } from "../provider/AuthContext";
import Header from '../components/Header'

export default function Inscription() {
  const userEmail = useRef();
  const userPwd = useRef();
  const userId = useRef();
  const userFirstName = useRef();
  const userName = useRef();
  const db = firebase.firestore();
  const logging = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(logging.isLogged === true){
        return <Redirect to="/Menu"/>
      }
    });
  }, []);

  const handleNewUser = e => {
    e.preventDefault();
    const email = userEmail.current.value;
    const pwd = userPwd.current.value;
    const id = userId.current.value;
    const name = userName.current.value;
    const firstName = userFirstName.current.value;

    if (email && pwd && id && name && firstName) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(cred =>
          db
            .collection("users")
            .doc(cred.user.uid)
            .set({ firstName: firstName, name: name, id: id, email: email })
        )
        .then(<Redirect to="/Menu" />)
        .catch(err => {
          console.log("error occured during registery of the new user :", err);
        });
    }
  };

  return !logging.isLogged ? (
    <div>
      <Header title="Inscription" />
      <form action="#" method="get" className="form inscription_form">
        <div className="inlineCtn">
          <label className="input_label" htmlFor="name">Nom&nbsp;:</label>
          <input className="input_ctn" id="name" name="name" type="text" ref={userName} required />
        </div>
        <div className="inlineCtn">
          <label className="input_label" htmlFor="firstName">Prénom&nbsp;:</label>
          <input 
          className="input_ctn"
            id="firstName"
            name="firstName"
            type="text"
            ref={userFirstName}
            required
          />
        </div>
        <div className="inlineCtn">
          <label className="input_label" htmlFor="email">Email&nbsp;:</label>
          <input className="input_ctn" id="email" name="email" type="email" ref={userEmail} required />
        </div>
        <div className="inlineCtn">
          <label className="input_label" htmlFor="ID">ID de bagueur&nbsp;:</label>
          <input className="input_ctn" id="ID" name="ID" type="text" ref={userId} required />
        </div>
        <div className="inlineCtn">
          <label className="input_label" htmlFor="password">Password&nbsp;:</label>
          <input
          className="input_ctn"
            id="password"
            name="password"
            type="password"
            ref={userPwd}
            required
          />
        </div>
        <div className="btn_container btn_container_connect btn_container_line">
          <button className="btn btn_small" onClick={handleNewUser}><span className="link">Confirmer</span></button>
          <button className="btn btn_small_outline">
            <Link className="link" to="/">Retour</Link>
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to="/Menu" />
  );
}
