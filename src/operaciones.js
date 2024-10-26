import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './css/operaciones.css';

function Operaciones() {
  const [activeTab, setActiveTab] = useState('compra');
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    axios.get('/currencies')
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    calculateTotal(value, exchangeRate);
  };

  const calculateTotal = (amount, exchangeRate) => {
    if (amount && exchangeRate) {
      setTotal((amount * exchangeRate).toFixed(2));
    } else {
      setTotal('');
    }
  };

  const handleCurrencyChange = () => {
    if (fromCurrency && toCurrency) {
      const fromCurrencyData = currencies.find(c => c.name === fromCurrency);
      const toCurrencyData = currencies.find(c => c.name === toCurrency);

      if (fromCurrencyData && toCurrencyData) {
        const rate = activeTab === 'compra'
          ? (fromCurrencyData.buyPrice / toCurrencyData.sellPrice).toFixed(4)
          : (fromCurrencyData.sellPrice / toCurrencyData.buyPrice).toFixed(4);
        setExchangeRate(rate);
        calculateTotal(amount, rate);
      }
    }
  };

  useEffect(() => {
    handleCurrencyChange();
  }, [fromCurrency, toCurrency, activeTab]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const operation = {
      fromCurrency,
      toCurrency,
      amount,
      exchangeRate,
      total,
      type: activeTab
    };

    const url = activeTab === 'compra' ? '/compras' : '/ventas';

    axios.post(url, operation)
      .then((response) => {
        console.log('Operación guardada:', response.data);
        setFromCurrency('');
        setToCurrency('');
        setAmount('');
        setExchangeRate('');
        setTotal('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="">Seleccione una moneda</option>
              {currencies.map((currency, index) => (
                <option key={index} value={currency.name}>{currency.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group1">
            <label>A:</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="">Seleccione una moneda</option>
              {currencies.map((currency, index) => (
                <option key={index} value={currency.name}>{currency.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group1">
            <label>Cantidad {fromCurrency}:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" value={amount} onChange={handleAmountChange} />
              <span>{fromCurrency}</span>
            </div>
          </div>

          <div className="form-group1">
            <label>Tipo de Cambio:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" value={exchangeRate} disabled />
              <span>{fromCurrency}/{toCurrency}</span>
            </div>
          </div>

          <div className="form-group1">
            <label>Total {toCurrency}:</label>
            <div className="input-group1">
              <span>$</span>
              <input type="number" placeholder="0.00" value={total} disabled />
              <span>{toCurrency}</span>
            </div>
          </div>

          <button className="btn-submit" onClick={handleSubmit}>
            {activeTab === 'compra' ? 'Realizar Compra' : 'Realizar Venta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Operaciones;