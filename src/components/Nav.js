import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  //State
  const [pathName, setPathName] = useState(null)

    useEffect(()=>{
        setPathName(window.location.pathname)
    }, [])

    const check = (pathName, path)=>{
      if(pathName.includes(path)){
        return "btn_active"
      }else{
        return "btn_inactive"
      }
    }


  return (
    pathName !== null ? <div className="nav_menu">
    <button className={"btn_menu "+check(pathName, "/Catches")}>
      <Link className="link_menu link_catch" to="/Catches">Capture</Link>
    </button>
    <button className={"btn_menu "+check(pathName, "/Lists")}>
      <Link className="link_menu link_list" to="/Lists">Listes</Link>
    </button>
    <button className={"btn_menu "+check(pathName, "/Menu")}>
      <Link className="link_menu link_main" to="/Menu">Menu</Link>
    </button>
    <button className={"btn_menu "+check(pathName, "/Map")}>
      <Link className="link_menu link_map" to="/Map">Carte</Link>
    </button>
    <button className={"btn_menu "+check(pathName, "/Encyclopedia")}>
      <Link className="link_menu link_ency" to="/Encyclopedia">Encyclopedie</Link>
    </button>
  </div> : <p>Determining path</p>
  );
}
