import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; // Asegúrate de tener configurado axios

import defaultLogo from './logo.svg'; // Logo por defecto

function Splash() {
    const [logoUrl, setLogoUrl] = useState(defaultLogo);
    const [businessName, setBusinessName] = useState('Casa de Cambio');

    useEffect(() => {
        axios.get('/configuraciones')
            .then((response) => {
                const config = response.data.configuration;
                setBusinessName(config.businessName || 'Casa de Cambio');
                setLogoUrl(config.logo ? `http://localhost:3001/${config.logo}` : defaultLogo);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        document.body.classList.add("splash-body");
        return () => document.body.classList.remove("splash-body");
    }, []);
    

    return (
        <div className="splash-screen">
            <div className="content">
                <img src={logoUrl} alt="Casa de Cambio Logo" className="logo" />
                <h1>{businessName}</h1>
                <hr className="underline" />
            </div>
        </div>
    );
}

export default Splash;