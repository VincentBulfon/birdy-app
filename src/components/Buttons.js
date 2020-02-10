import React from "react";
import { Link } from "react-router-dom";

export default function Buttons(props) {
  return (
    <div className="btn_container btn_container_line btn_container_connect btn_info">
      <button className="btn btn_small">
        <Link className="link" to={props.nextLink}>{props.name}</Link>
      </button>
      <button className="btn btn_small_outline">
        <Link className="link" to={props.prevLink}>Retour</Link>
      </button>
    </div>
  );
}
