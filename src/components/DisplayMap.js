import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";
import firebase from "../fireConfig";
import Nav from "./Nav";

function Map() {
  const [sites, setSites] = useState(null);
  const [selectedSite, setSelectedSite] = useState(false);

  useEffect(() => {
    const siteList = async () => {
      const db = firebase.firestore();
      await db
        .collection("sites")
        .get()
        .then(elmts => {
          const data = elmts.docs.map(el => {
            return el.data();
          });
          if (data) {
            setSites(data);
          }
        });
    };
    siteList();
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 50.63255741, lng: 5.5796662 }}>
      {sites !== null ? (
        sites.map(site => (
          <React.Fragment key={site.name}>
            
            <Marker
              position={{
                lat: site.coord._lat,
                lng: site.coord._long
              }}
              icon={{
                url: `https://firebasestorage.googleapis.com/v0/b/birdy-app.appspot.com/o/assets%2Fplace.svg?alt=media&token=d5e03fa3-1bb0-4560-bc26-7eb085da76ac`,
                scaledSize: new window.google.maps.Size(20, 20)
              }}
              onClick={() => {
                setSelectedSite(site);
              }}
            />
            <Circle
              defaultCenter={{
                lat: site.coord._lat,
                lng: site.coord._long
              }}
              radius={parseInt(site.size)}
            />
          </React.Fragment>
        ))
      ) : (
        <p>Chargement de la page</p>
      )}

      {selectedSite && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedSite(null);
          }}
          defaultPosition={{
            lat: selectedSite.coord._lat,
            lng: selectedSite.coord._long
          }}>
          <div>
            <h2>{selectedSite.name}</h2>
            <p>
              Coordonées exactes :{" "}
              {selectedSite.coord._lat + ",  " + selectedSite.coord._long}
            </p>
            <p>Nombre de captures : {selectedSite.nbr_cap}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Display() {
  return (
    <React.Fragment>
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCVHxOar9CmL2gVXsaTiKHKh_ZmKhimwmY&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `90%` }} />}
        />
        <button id="smaller_btn" className="btn absolute btn_small">
          <Link className="link absolute_btn" to="/addSite">Ajouter</Link>
        </button>
      </div>
      <Nav />
    </React.Fragment>
  );
}
