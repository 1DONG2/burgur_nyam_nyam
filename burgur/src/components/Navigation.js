import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamBurger } from '@fortawesome/free-brands-svg-icons';
import { faHamburger, faUser } from '@fortawesome/free-solid-svg-icons';
import mainlogo from 'files/burgur.png';

function Navigation({ userObj }) {
  if (userObj.displayName === null) {
    const name = userObj.email.split('@')[0];
    userObj.displayName = name;
  }

  return (

    <nav>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginRight: 30,
      }}>
      <a href='/'>
            <img src={mainlogo} alt='메인 아이콘' 
            style={{ width: '300px', height: '120px' }}/>
      </a>
      </div>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginBottom: '70px',
        }}>
        <li>
          <Link to='/' style={{
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
            }}>
            <FontAwesomeIcon icon={faHamburger} color={'orange'} size='2x' />
            <span style={{ marginTop: 10 }}>메인</span>
          </Link>
        </li>
        <li>
          <Link
            to='/profile'
            style={{
              marginLeft: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
            }}>
            <FontAwesomeIcon icon={faUser} color={'green'} size='2x' />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}`
                : 'Profile'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
