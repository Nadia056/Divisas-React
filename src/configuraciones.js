import React, { useState } from 'react';
import './css/config.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import logo from './Picture.png';
function Configuraciones() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            // Aquí puedes manejar el archivo seleccionado, por ejemplo, subirlo a un servidor
            console.log('Archivo seleccionado:', selectedFile);
        } else {
            console.log('No se ha seleccionado ningún archivo.');
        }
    };

    return (
        <div >
            <header><h1 className='configh1'>Configuraciones</h1></header>
            <div className="form-container">
            <form className="business-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="logo">Logotipo</label>
                    <div className="image-upload">
                        <input type="file" id="logo" onChange={handleFileChange} />
                        <div className="upload-box">
                            <img  src={logo} style={{ fontSize: '60px', color: '#1abc9c', marginRight: '10px', padding:'10px'}}  />

                            
                            <p>Drop your image here, or <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('logo').click(); }}>browse</a></p>
                            <small>Supports: PNG, JPG, JPEG, WEBP</small>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre del negocio</label>
                    <input type="text" id="name" placeholder="Nombre del negocio..." />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" id="address" placeholder="Av calle 1234, 637462, Mx" />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Ciudad</label>
                    <input type="text" id="city" placeholder="Ciudad..." />
                </div>

                <div className='form-group'>
                    <label htmlFor="state">Estado</label>
                    <select id="state">
                        <option value="">Selecciona un estado...</option>
                        <option value="CDMX">CDMX</option>
                        <option value="JAL">Jalisco</option>
                        <option value="NL">Nuevo León</option>
                        <option value="QR">Quintana Roo</option>
                    </select>

                </div>

                <button type="submit" className="btn-submit">Enviar</button>
            </form>
            </div>
        </div>
    );
}

export default Configuraciones;