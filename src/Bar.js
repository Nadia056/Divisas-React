import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faGear, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import './css/nav.css';

function Navigation() {
    return (
        <div className='nav'>
            <ul>
                <li>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faHouse} />
                        <p>Inicio</p>
                    </Link>
                </li>
                <li>
                    <Link to='/operaciones'>
                        <FontAwesomeIcon icon={faHandHoldingDollar} />
                        <p>Operaciones</p>
                    </Link>
                </li>
                <li>
                    <Link to='/configuraciones'>
                        <FontAwesomeIcon icon={faGear} />
                        <p>Configuraciones</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;