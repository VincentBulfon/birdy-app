import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import Header from "./Header";
import Nav from "./Nav";

export default function Encyclopedia() {
  const usectx = useContext(AuthContext);
  let id = 0
  return (
    <React.Fragment>
      <Header title="Encyclopedie" />
      {usectx !== null ? (
        <ul className="birdList">
          {usectx.encyclopedia.map(el => (
            <li key={id ++} className="bird">
              <div>
                {usectx.assets.map(asset => {
                  if (
                    el.data().picture === asset.meta.i.name.replace(".jpg", "")
                  ) {
                    return <img className="bird_pic" src={asset.link.i} alt={asset.meta.i.name} />;
                  }
                })}
                <p><span className="bold">Nom latin :</span>{el.data().latin_name}</p>
              </div>
              <div className="more">
                <p><span className="bold">Nom commun :</span> {el.data().common_name}</p>
                <p><span className="bold">Famille :</span>{el.data().common_name}</p>
                <p><span className="bold">Durée de vie :</span> {el.data().life_span}</p>
                <p><span className="bold">Nourriture :</span>{el.data().food}</p>
                <p><span className="bold">Lieu de vie :</span>{el.data().life_place}</p>
                <p><span className="bold">Description :</span>{el.data().description}</p>
                <p><span className="bold">Type de vol :</span> {el.data().flight_type}</p>
                <p><span className="bold">Taille :</span>{el.data().size}</p>
                <p><span className="bold">Envergure :</span>{el.data().span}</p>
                <p><span className="bold">Poids :</span>{el.data().weight}</p>
                {usectx.assets.map(asset => {
                  if (
                    el.data().sound === asset.meta.i.name.replace(".mp3", "")
                  ) {
                    return (
                      <figure>
                        <figcaption><span className="bold">Ecouter son chant :</span></figcaption>
                        <audio controls src={asset.link.i}>
                          Your browser does not support the
                          <code>audio</code> element.
                        </audio>
                      </figure>
                    );
                  }
                })}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement en cours</p>
      )}
      <Nav />
    </React.Fragment>
  );
}
