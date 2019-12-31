import React from 'react'
import {Link} from 'react-router-dom'

export default function Connection() {
  return (
    <React.Fragment>
      <div>
        <button>retour</button>
        <h2>Connexion</h2>
      </div>
      <form action="#" method="Post">
          <label for="email">Email&nbsp;:</label>
          <input id="email" name="email" type="email"/>
          <label for="ID">ID de bagueur&nbsp;:</label>
          <input id="ID" name="ID" type="text"/>
          <label for="password">password&nbsp;:</label>
          <input id="password" name="password" type="password"/>
          <button><Link to="/recover password">Mot de passe oublié ?</Link></button>
          <button>Confirmer</button>
          <button><Link to="/">Retour</Link></button>
      </form>
    </React.Fragment>
  )
}

