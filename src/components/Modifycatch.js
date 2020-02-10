import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import firebase from "../fireConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import Nav from './Nav'

export default function Catches(props) {
  const [textErr, setTextErr] = useState();
  const [location, setLocation] = useState(null);
  const [cap, setCap] = useState(false);
  const [err, setErr] = useState(false);
  const [typeErr, setTypeErr] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [catchData, setCatchData] = useState(false);

  //ctx
  const logging = useContext(AuthContext);

  //catch consts
  const cType = useRef();
  const bName = useRef();
  const bLocation = useRef();
  const bRecatch = useRef();
  const bRing = useRef();
  const bSex = useRef();
  const bAge = useRef();
  const bLenght = useRef();
  const bWeight = useRef();
  const bFat = useRef();

  //onComponent load
  useEffect(() => {
    setCatchData(props.location.aboutProps);
  }, []);

  useEffect(() => {
    if (catchData !== false) {
      cType.current.value = catchData.el.data().bird.type;
      bName.current.value = catchData.el.data().bird.name;
      bLocation.current.value = catchData.el.data().bird.location;
      bRing.current.value = catchData.el.data().bird.ring;
      bSex.current.value = catchData.el.data().bird.sex;
      bAge.current.value = catchData.el.data().bird.age;
      bLenght.current.value = catchData.el.data().bird.lenght;
      bWeight.current.value = catchData.el.data().bird.weight;
      bFat.current.value = catchData.el.data().bird.fat;
    }
  }, [catchData]);

  //func
  const handleUpdate = e => {
    e.preventDefault();
    if (
      cType.current.value !== "" &&
      bName.current.value !== "" &&
      bLocation.current.value !== "" &&
      bRing.current.value !== "" &&
      bSex.current.value !== "" &&
      bAge.current.value !== "" &&
      bLenght.current.value !== "" &&
      bWeight.current.value !== "" &&
      bFat.current.value !== ""
    ) {
      setErr(false);
      if (
        !bName.current.value.match("^[a-zA-Z_ ]*$") &&
        !bLocation.current.value.match(
          "^[-+]?([1-8]?d(.d+)?|90(.0+)?)s*[-+]?(180(.0+)?|((1[0-7]d)|([1-9]?d))(.d+)?)$"
        ) &&
        !bLenght.current.value.match("^d+(.d{1,2})?$") &&
        !bWeight.current.value.match("^d+(.d{1,2})?$") &&
        !bFat.current.value.match("^[1-9]?[0-9]{1}$|^100$")
      ) {
        setTypeErr(true);
      } else {
        setTypeErr(false);
        if (
          cType.current.value !== catchData.el.data().bird.type ||
          bName.current.value !== catchData.el.data().bird.name ||
          bLocation.current.value !== catchData.el.data().bird.location ||
          bRing.current.value !== catchData.el.data().bird.ring ||
          bSex.current.value !== catchData.el.data().bird.sex ||
          bAge.current.value !== catchData.el.data().bird.age ||
          bLenght.current.value !== catchData.el.data().bird.lenght ||
          bWeight.current.value !== catchData.el.data().bird.weight ||
          bFat.current.value !== catchData.el.data().bird.fat
        ) {
          const ring = bRing.current.value.toUpperCase();
          firebase
            .firestore()
            .collection("captures").doc(catchData.el.id)
            .set({
              bird: {
                name: bName.current.value,
                type: cType.current.value,
                location: bLocation.current.value,
                recatch: bRecatch.current.checked,
                ring: ring,
                sex: bSex.current.value,
                age: bAge.current.value,
                lenght: bLenght.current.value,
                weight: bWeight.current.value,
                fat: bFat.current.value
              },
              date: startDate,
              user: logging.Uid
            });
        }
        setCap(true);
      }
    } else {
      setErr(true);
    }
  };

  useEffect(() => {
    if (location !== null) {
      bLocation.current.value = location.latitude + " " + location.longitude;
    }
  }, [location]);

  useEffect(() => {
    if (cap === true) {
      const delayed = setTimeout(() => {
        setRedirect(true);
      }, 1500);
      return () => {
        clearTimeout(delayed); //on a besoin d'arreter le timeout parce que son exécution est asynchrone et créer une fuite de mémoire lorsque le composant est démonté et passe par le useEffect
      };
    }
  }, [cap]);

  const showError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setTextErr(
          "Vous avez refusé l'accès à votre localisation, vous devez autoriser l'accès pour pouvoir utiliser cette fonctionnalité"
        );
        break;
      case error.POSITION_UNAVAILABLE:
        setTextErr(
          "Votre position est indisponible, veuillez réessayer. Il se peut que la couverture gps ne soit pas bonne à votre emplacement"
        );
        break;
      case error.TIMEOUT:
        setTextErr("Votre demande à expiré. Veuillez réssayer.");
        break;
      case error.UNKNOWN_ERROR:
        setTextErr(
          "Une erreur inconnue est survenue, veuillez réssayer après un cretain temps."
        );
        break;
      default:
        setTextErr(null);
        break;
    }
  };

  const displayLocation = data => {
    const position = data.coords;
    setLocation({ latitude: position.latitude, longitude: position.longitude });
  };

  const handleLocation = e => {
    e.preventDefault();
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        displayLocation,
        showError,
        options
      );
    } else {
      setTextErr(
        "Localisation non supportée veuillez mettre à jour votre navigateur pour utiliser cette fonctionnalité"
      );
    }
  };

  return catchData === false ? (
    <p>Loading</p>
  ) : (
    <React.Fragment>
      {cap && <p className="feedback">Modification effectuée avec succès</p>}
      <Header title="Faire une capture"/> 
      <form className="form catch_form">
        <fieldset className="groupe1">
          <div className="inlineCont in">
            <label className="input_lab" htmlFor="latin_name">Nom latin&nbsp;:</label>
            <input className="input_inp" id="latin_name" name="latin_name" type="text" ref={bName} />
          </div>
          <div className="inlineCont sel">
            <label className="input_lab" htmlFor="capType">Type de capture&nbsp;:</label>
            <select className="input_sel" name="capType" id="capType" ref={cType}>
              <option value="">Veuillez choisir</option>
              <option value="nid">nid</option>
              <option value="filet">filet</option>
            </select>
          </div>
        </fieldset>
        <fieldset className="groupe2">
          <div className="inlineCont in">
            <label className="input_lab" htmlFor="location">Localisation&nbsp;:</label>
            <input 
            className="input_inp"
              id="location"
              name="location"
              type="text"
              placeholder="exe : 50.6337300 5.5674900"
              ref={bLocation}
            />
          </div>
          <div className="locate_center">
          <button className="input_btn" onClick={handleLocation}>Localiser</button>
            {textErr && <p className="error">{textErr}</p>}
          </div>
          <span className="input_lab">Date&nbsp;:</span>
          <DatePicker
          className="input_date"
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
            <div className="recatch chk">
              <input className="input_chk" id="renewal" name="renewal" type="checkbox" ref={bRecatch} />
              <label className="input_lab" htmlFor="renewal">Reprise&nbsp;</label>
            </div>

          <div className="inlineCont in">
            <label className="input_lab"  htmlFor="nBague">N° de bague&nbsp;:</label>
            <input className="input_inp" id="nBague" name="nBague" type="text" placeholder={"ex : BE 46732 AMX"} ref={bRing} />
          </div>
        </fieldset>
        <fieldset className="groupe3">
          <div className="inlineCont sel">
            <label className="input_lab" htmlFor="sex">Sexe&nbsp;:</label>
            <select className="input_sel" name="sex" id="sex" ref={bSex}>
              <option value="">Veuillez choisir</option>
              <option value="male">mâle</option>
              <option value="female">femelle</option>
            </select>
          </div>
          <div className="inlineCont sel">
            <label className="input_lab" htmlFor="age">Âge&nbsp;:</label>
            <select name="age" id="age" ref={bAge}>
              <option value="">Veuillez choisir</option>
              <option value="chick">poussin</option>
              <option value="juvenil">juvénil</option>
              <option value="adulte">adulte</option>
            </select>
          </div>
          <div className="inlineCont in">
            <label className="input_lab" htmlFor="wingLenght">Longeur à l'aile (cm)&nbsp;:</label>
            <input
            className="input_inp"
              id="wingLenght"
              name="wingLenght"
              type="text"
              placeholder={"ex : 11"}
              ref={bLenght}
            />
          </div>
          <div className="inlineCont in">
            <label className="input_lab" htmlFor="weight">Poid (gr)&nbsp;: </label>
            <input className="input_inp" id="weight" name="weight" type="text" placeholder={"ex : 132"} ref={bWeight} />
          </div>
          <div className="inlineCont in">
            <label className="input_lab" htmlFor="adiposity">
              Adiposité (%) &nbsp;:
            </label>
            <input className="input_inp" id="adiposity" name="adiposity" type="text" placeholder={"ex : 12"} ref={bFat} />
          </div>
        </fieldset>
        <p className="help">
          Toutes les informations saisies ci-dessus peuvent toujours être
          modifiées via la liste des captures une fois qu'elle ont été validées.
        </p>
        <div>
          {err && <p className="err">Un ou plusieurs de vos champs est/sont vide(s)</p>}
          {typeErr && <p className="err">Un ou plusieurs champ(s) est/sont mal formulé(s)</p>}
        </div>
        <div className="btn_container btn_container_line btn_form">
          <button className="btn btn_small" onClick={handleUpdate}><span className="link">Sauver</span></button>
          <button className="btn btn_small_outline">
            <Link className="link" to="/Menu">Retour</Link>
          </button>
        </div>
      </form>
      <Nav/>
    </React.Fragment>
  );
}
