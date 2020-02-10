import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import CatchList from "./CatchList";
import UserList from "./UserList";
import firebase from "../fireConfig";
import { AuthContext } from "../provider/AuthContext";
import Nav from "./Nav";

export default function Lists() {
  //state
  const [choice, setChoice] = useState("users");
  const [title, setTitle] = useState("Liste des utilisateurs");
  const [data, setData] = useState();
  const [allCatches, setAllCatches] = useState();

  //ctx
  const logging = useContext(AuthContext);

  //title logic
  const handleList = () => {
    if (choice === "birds") {
      setChoice("users");
      localStorage.setItem("displayCatches", "users");
    } else {
      setChoice("birds");
      localStorage.setItem("displayCatches", "birds");
    }
  };

  //exeuted once
  useEffect(() => {
    const display = localStorage.getItem("displayCatches");
    if (display) {
      setChoice(display);
    }
    const fetchdata = async captures => {
      const db = firebase.firestore();
      await db
        .collection("captures")
        .get()
        .then(snapshot => {
          const allDocs = snapshot.docs.map(el => el);
          setAllCatches(allDocs); //les données sont conservées entiement pour les passer à l'enfant pour éviter une nouvelle requête des même données dans ce dernier
          const docs = allDocs.filter(el => el.data().user === logging.Uid);
          setData(docs); //les données correspondant à l'utilisateur actuel sont mise dans un autre states
        });
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (choice === "birds") {
      setTitle("Liste de vos captures");
    } else {
      setTitle("Liste des utilisateurs");
      //getUsers();
    }
  }, [choice]);

  return (
    <React.Fragment>
      <div>
        <Header title={title} />
      </div>
      <div>
        {choice === "birds" ? (
          <CatchList list={data} />
        ) : data ? (
          <UserList list={allCatches} />
        ) : null}
      </div>
      <div className="fixed">
        <button className="alternate btn btn_big" onClick={handleList}>
          <span className="link">Alterner utilisateurs/captures</span>
        </button>
      </div>
      <Nav />
    </React.Fragment>
  );
}
