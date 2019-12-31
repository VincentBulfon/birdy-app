import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <h1>Birdy App</h1>
      <button>
        <Link to="/connection">Connexion</Link>
      </button>
      <button>
        <Link to="/inscription">Inscription</Link>
      </button>
    </React.Fragment>
  );
}
