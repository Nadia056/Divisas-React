import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './css/config.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import logo from './Picture.png';

function Configuraciones() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [states, setStates] = useState([]);
    const [logoUrl, setLogoUrl] = useState(logo);
    const [currentLogo, setCurrentLogo] = useState(null);

    useEffect(() => {
        axios.get('/estados')
            .then((response) => {
                setStates(response.data.estados);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('/configuraciones')
            .then((response) => {
                const config = response.data.configuration;
                setBusinessName(config.businessName);
                setAddress(config.address);
                setCity(config.city);
                setState(config.state);
                const logoPath = config.logo ? `http://localhost:3001/${config.logo}` : logo;
                setLogoUrl(logoPath);
                setCurrentLogo(config.logo);
                setFileName(config.logo ? config.logo.split('/').pop() : '');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setLogoUrl(URL.createObjectURL(file));
        setFileName(file.name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        if (selectedFile) {
            formData.append('logo', selectedFile);
        }

        axios.post('/configuraciones', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log('Datos del negocio guardados:', response.data);
            if (!selectedFile) {
                setLogoUrl(`http://localhost:3001/${currentLogo}`);
            } else {
                setCurrentLogo(response.data.logo);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <header><h1 className='configh1'>Configuraciones</h1></header>
            <div className="form-container">
                <form className="business-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="logo">Logotipo</label>
                        <div className="image-upload">
                            <input type="file" id="logo" onChange={handleFileChange} />
                            <div className="upload-box">
                                <img src={logoUrl} style={{ fontSize: '60px', color: '#1abc9c', marginRight: '10px', padding: '10px' }} />
                                <p>{fileName || 'Drop your image here, or'} <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('logo').click(); }}>browse</a></p>
                                <small>Supports: PNG, JPG, JPEG, WEBP</small>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre del negocio</label>
                        <input type="text" id="name" placeholder="Nombre del negocio..." value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" placeholder="Av calle 1234, 637462, Mx" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" placeholder="Ciudad..." value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="state">Estado</label>
                        <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">Selecciona un estado...</option>
                            {states.map((estado, index) => (
                                <option key={index} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Configuraciones;