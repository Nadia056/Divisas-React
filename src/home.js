import logo from './dolar.png';

import Navigation from './Bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function home() {
  return (
    <div className="App">
     <header>
        <h1>Registro de Tipo de Cambio</h1>
      </header>
      <div className="registrar">
        <FontAwesomeIcon icon={faGlobe} className="icon-globe" />
        <div className="form-group">
          <label>Cambio:</label>
          {/* <select>
            <option>USD</option>
            <option>MXN</option>
            <option>EUR</option>
            <option>YEN</option>
          </select>    */}
          <input type="text" placeholder="USD" />
          <input type="number" placeholder="0.00" />
        </div>
        <button className="btn-submit">Guardar Tipo de Cambio</button>
      </div>
      <section className="currencies">
        <h2>Divisas</h2>
        <div className="currency-list">
          <div className="currency-item">
            <div className="circle">D</div>
            <div>
              <label>Dolar</label>
              <p>Precios: 1</p>
            </div>
          </div>
          <div className="currency-item">
            <div className="circle">E</div>
            <div>
              <label>Euro</label>
              <p>Precios: 0.91</p>
            </div>
          </div>
          <div className="currency-item">
            <div className="circle">MXN</div>
            <div>
              <label>Peso Mexicano</label>
              <p>Precios: 20.11</p>
            </div>
          </div>
          <div className="currency-item">
            <div className="circle">MXN</div>
            <div>
              <label>Peso Mexicano</label>
              <p>Precios: 20.11</p>
            </div>
          </div>
          <div className="currency-item">
            <div className="circle">MXN</div>
            <div>
              <label>Peso Mexicano</label>
              <p>Precios: 20.11</p>
            </div>
          </div>
          <div className="currency-item">
            <div className="circle">Y</div>
            <div>
              <label>Yen</label>
              <p>Precios: 142.12</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default home;
