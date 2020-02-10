import React from 'react'
import Buttons from './Buttons'
import Header from './Header'

export default function PreInscription() {
    return (
        <React.Fragment>
            <Header title="Inscription"/>
            <p className="info">
            Avant de continuer, vous devez avoir un ID obtenu sur le site de l'<a className="upper_link" href="https://odnature.naturalsciences.be/bebirds/fr/become-a-ringer" target="_blank" rel="noopener noreferrer">INSTITUT ROYAL DES SCIENCES NATURELLES DE BELGIQUE</a>. La procédure pour obtenir le ID ainsi que le permis sont expliquée sur le site. 
            </p>
            <Buttons name="Suivant" nextLink="./Inscription" prevLink="/" />
        </React.Fragment>
    )
}
