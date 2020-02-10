import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import firebase from "../fireConfig";
import { AuthContext } from "../provider/AuthContext";
import Header from "./Header";
import Nav from "./Nav";

export default function AddSite() {
  //state
  const [sites, setSites] = useState(null);
  const [value, setValue] = useState(0);
  const name = useRef();
  const locationStr = useRef();
  const range = useRef();
  const capNbr = useRef();

  //ctx
  const ctx = useContext(AuthContext);

  //on Load
  useEffect(() => {
    const data = async () => {
      const db = firebase.firestore();
      await db
        .collection("sites")
        .get()
        .then(elmts => {
          const allSites = elmts.docs.map(elmt => elmt.data());
          if (allSites) {
            setSites(allSites);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    data();
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    const coords = getLocation(locationStr.current.value);
    const addData = async () => {
      console.log("addd");
      const db = firebase.firestore();
      await db.collection("sites").add({
        name: name.current.value,
        coord: new firebase.firestore.GeoPoint(coords.lat, coords.long),
        nbr_cap: capNbr.current.value,
        size: range.current.value
      });
    };
    addData();
  };

  const getLocation = string => {
    const commaIndex = string.indexOf(",");
    const lat = parseFloat(string.substring(0, commaIndex));
    const long = parseFloat(string.substring(commaIndex + 1, string.length));
    const coords = { lat, long };
    if (coords) {
      return coords;
    }
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Header title="Ajouter un site" />
      <form className="form catch_form">
        <div className="inlineCont in">
          <label className="input_lab" htmlFor="name">
            Nom du site :{" "}
          </label>
          <input
            className="input_inp"
            id="name"
            name="name"
            type="text"
            required
            ref={name}
          />
        </div>
        <div className="inlineCont in">
          <label className="input_lab" htmlFor="location">
            Localistation (lat,long) :{" "}
          </label>
          <input
            placeholder="ex : 50.342304,5.435765"
            className="input_inp"
            id="location"
            name="location"
            type="text"
            required
            ref={locationStr}
          />
        </div>
        <div className="inlineCont in">
          <label className="input_lab" htmlFor="myRange">
            Superficie:
          </label>
          <input
            className="input_inp"
            type="range"
            min="10"
            max="500"
            value={value}
            onChange={handleChange}
            step={1}
            id="myRange"
            ref={range}
          />
          <span className="input_lab">{value}m</span>
        </div>
        <div className="inlineCont in">
          <label className="input_lab" htmlFor="nbrCap">
            Nombre de captures :{" "}
          </label>
          <input
            className="input_inp"
            id="nbrCap"
            name="nbrCap"
            type="text"
            required
            ref={capNbr}
          />
        </div>
        <div className="btn_container btn_container_line btn_form">
          <button className="btn btn_small" onClick={handleAdd}><span className="link">Créer</span></button>
          <button className="btn btn_small_outline">
            <Link className="link" to="/Map">Retour</Link>
          </button>
        </div>
      </form>
      <Nav />
    </React.Fragment>
  );
}
