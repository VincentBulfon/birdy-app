import React, { useEffect, useState } from "react";
import firebase from "../fireConfig";

export default function UserList(props) {
  //state
  const [data, setData] = useState();
  const [catches, setCatches] = useState();

  //effects
  useEffect(() => {
    const fetchdata = async captures => {
      const db = firebase.firestore();
      await db
        .collection("users")
        .get()
        .then(snapshot => {
          const allDocs = snapshot.docs.map(el => el);
          setData(allDocs);
        });
    };
    fetchdata();
    setCatches(props.list);
  }, []);

  const countCatches = userId => {
    if (catches) {
      const resultArr = catches.filter(el => el.data().user === userId);
      return resultArr.length;
    }
  };

  return (
    <div>
      {data ? (
        <ul className="listContainer">
          {data ? (
            data.map(el => {
              const idUser = el.id;
              const { name, firstName, id } = el.data();
              return (
                <li key={id} className="user">
                  <div className="name">
                    <span className="name_id"><span className="bold">Nom :</span> {name}</span>
                    <span className="name_value"><span className="bold">Prenom :</span> {firstName}</span>
                  </div>
                  <div className="data">
                    <span className="data_id"><span className="bold">Id de bagueur :</span>{id}</span>
                    <span className="data_cap"><span className="bold">Nombre de captures :</span>{countCatches(idUser)}</span>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Aucune donnée ne correspond à votre recherche</p>
          )}
        </ul>
      ) : (
        <p>Chargment</p>
      )}
    </div>
  );
}
