import logo from './dolar.png';
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import Navigation from './Bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './App.css';

const MySwal = withReactContent(Swal);

function Home() {
  const [currencyName, setCurrencyName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get('/currencies')
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currency = {
      name: currencyName,
      buyPrice: buyPrice,
      sellPrice: sellPrice
    };

    // Verificar si la moneda ya existe
    const currencyExists = currencies.some(c => c.name.toLowerCase() === currencyName.toLowerCase());
    if (currencyExists) {
      MySwal.fire({
        title: 'Error',
        text: 'La moneda ya existe.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn-confirm'
        },
        buttonsStyling: false
      });
      return;
    }

    axios.post('/currencies', currency)
      .then((response) => {
        setCurrencies([...currencies, response.data]);
        setCurrencyName('');
        setBuyPrice('');
        setSellPrice('');
        MySwal.fire({
          title: 'Éxito',
          text: 'La moneda ha sido guardada.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn-confirm'
          },
          buttonsStyling: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (currencyName) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la moneda ${currencyName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/currencies/${currencyName}`)
          .then(() => {
            setCurrencies(currencies.filter(c => c.name !== currencyName));
            MySwal.fire({
              title: 'Eliminado',
              text: 'La moneda ha sido eliminada.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn-confirm'
              },
              buttonsStyling: false
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleEdit = (currency) => {
    MySwal.fire({
      title: 'Editar moneda',
      html: `
        <input id="swal-input1" class="swal2-input" value="${currency.name}" readonly>
        <input id="swal-input2" class="swal2-input" value="${currency.buyPrice}">
        <input id="swal-input3" class="swal2-input" value="${currency.sellPrice}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel'
      },
      buttonsStyling: false,
      preConfirm: () => {
        const newBuyPrice = document.getElementById('swal-input2').value;
        const newSellPrice = document.getElementById('swal-input3').value;
        return { ...currency, buyPrice: newBuyPrice, sellPrice: newSellPrice };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCurrency = result.value;
        axios.put(`/currencies/${currency.name}`, updatedCurrency)
          .then(() => {
            setCurrencies(currencies.map(c => c.name === currency.name ? updatedCurrency : c));
            MySwal.fire({
              title: 'Actualizado',
              text: 'La moneda ha sido actualizada.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn-confirm'
              },
              buttonsStyling: false
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="App">
      <Navigation />
      <header>
        <h1>Registro de Tipo de Cambio</h1>
      </header>
      <div className="registrar">
        <FontAwesomeIcon icon={faGlobe} className="icon-globe" />
        <div className="form-group">
          <label>Cambio:</label>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currencyName">Nombre de la moneda</label>
              <input
                type="text"
                id="currencyName"
                value={currencyName}
                onChange={(e) => setCurrencyName(e.target.value)}
                placeholder="Nombre de la moneda"
                name="currencyName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyPrice">Precio de Compra</label>
              <input
                type="number"
                id="buyPrice"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="0.00"
                name="buyPrice"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sellPrice">Precio de Venta</label>
              <input
                type="number"
                id="sellPrice"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="0.00"
                name="sellPrice"
              />
            </div>
            <button type="submit" className="btn-submit">Guardar Tipo de Cambio</button>
          </form>
        </div>
      </div>
      <section className="currencies">
        <h2>Divisas</h2>
        <div className="currency-list">
          {currencies.map((currency, index) => (
            <div className="currency-item" key={index}>
              <div className="circle">{currency.name.charAt(0)}</div>
              <div>
                <label>{currency.name}</label>
                <p>Compra: {currency.buyPrice}</p>
                <p>Venta: {currency.sellPrice}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(currency)} className="btn-edit">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(currency.name)} className="btn-delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;