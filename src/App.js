import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Bar';
import Home from './home';
import Operaciones from './operaciones';
import Configuraciones from './configuraciones';
import Splash from './splash';  // Importa tu componente Splash
import './App.css';
import './css/operaciones.css';

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Establece un temporizador para ocultar el splash después de 3 segundos
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }, []);

    return (
        <Router>
            <div>
                {showSplash ? (  // Condicional para mostrar el Splash primero
                    <Splash />   // Muestra el componente Splash
                ) : (           // Después de 3 segundos, muestra el contenido principal
                    <>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/operaciones" element={<Operaciones />} />
                            <Route path="/configuraciones" element={<Configuraciones />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
