import React from 'react';
import './css/splash.css'; // Asegúrate de enlazar tu archivo de CSS correctamente.
import logo from './logo.svg'; // Importa tu imagen.

function Splash() {
    return (
        <div className="splash-screen">
            <div className="content">
                <img src={logo} alt="Casa de Cambio Logo" className="logo" />
                <h1>Casa de Cambio</h1>
                <hr className="underline" />
            </div>
        </div>
    );
}

export default Splash;
