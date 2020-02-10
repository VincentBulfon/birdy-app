import React, { createContext, useState, useEffect } from "react";
import firebase, { auth } from "../fireConfig";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  //le provider va recevoir les enfants en tant que props
  const [isLogged, setIsLogged] = useState(false);
  const [Uid, setUid] = useState(null);
  const [encyclopedia, setEncyclopedia] = useState(null);
  const [assets, setAssets] = useState();

  //on compoenent mounting phase
  useEffect(() => {
    const localUid = localStorage.getItem("Uid");
    const localAuth = localStorage.getItem("auth");
    if (localUid && localAuth) {
      isLoggedTrue(localUid);
    }
    auth.onAuthStateChanged(data => {
      if (data) {
        if (data.uid !== Uid) {
          localStorage.setItem("Uid", data.uid);
          isLoggedTrue(data.uid);
        }
      }
    });
  }, []);

  const isLoggedTrue = Uid => {
    localStorage.setItem("auth", true);
    setUid(Uid);
    setIsLogged(true);
    getEncyclopedia();
  };

  const isLoggedFalse = () => {
    setIsLogged(false);
    localStorage.clear();
    auth.signOut();
  };

  useEffect(() => {
    if (encyclopedia !== null) {
      const storage = firebase.storage();
      const storageRef = storage.ref("encyclopedie");
      storageRef.listAll().then(el => {
        const arrayLink = el.items.map(item => {
          const link = item.getDownloadURL();
          const meta = item.getMetadata().then(meta => {
            const name = meta.name;
            const type = meta.contentType
            return({name, type})
          });
          return { link, meta };
        });
        setAssets(arrayLink);
      });
    }
  }, [encyclopedia]);

  //get encyclopedia
  const getEncyclopedia = async () => {
    const db = firebase.firestore();
    await db
      .collection("encyclopedia")
      .get()
      .then(snapshot => {
        const encyclo = snapshot.docs.map(el => el);
        setEncyclopedia(encyclo);
      });
  };
  //value sert à rendre disponnible ce qui est passé dans cette propriété à tous enfants et consommateurs du contexte
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isLoggedTrue,
        isLoggedFalse,
        setUid,
        Uid,
        encyclopedia,
        assets,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
//props.children sert a récupérer les enfant qu'il emballe en amont plustot que de venir emvaller les enfants ici
