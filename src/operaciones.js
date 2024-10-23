import React, { useState } from 'react';
import './css/operaciones.css';

function Operaciones() {
  const [activeTab, setActiveTab] = useState('compra');

  return (
    <div className="operacion-cambio-container">
      <header><h1 className='h11'>Operación de Cambio</h1></header>

      <div className="operacion-cambio">

        <div className="tabs">
          <button
            className={activeTab === 'compra' ? 'active' : ''}
            onClick={() => setActiveTab('compra')}
          >
            Compra
          </button>
          <button
            className={activeTab === 'venta' ? 'active' : ''}
            onClick={() => setActiveTab('venta')}
          >
            Venta
          </button>
        </div>

        <div className="form">
          <div className="form-group1">
            <label>De:</label>
            <select>
              <option>USD</option>
              <option>MXN</option>
              <option>EUR</option>
              <option>YEN</option>
            </select>
          </div>

          <div className="form-group1">
            <label>A:</label>
            <select>
              <option>MXN</option>
              <option>USD</option>
              <option>EUR</option>
              <option>YEN</option>
            </select>
          </div>

          <div className="form-group1">
            <label>Cantidad USD:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" />
              <span>USD</span>
            </div>
          </div>

          <div className="form-group1">
            <label>Tipo de Cambio:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" disabled />
              <span>USD/MXN</span>
            </div>
          </div>

          <div className="form-group1">
            <label>Total MXN:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" disabled />
              <span>MXN</span>
            </div>
          </div>

          <button className="btn-submit">
            {activeTab === 'compra' ? 'Realizar Compra' : 'Realizar Venta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Operaciones;