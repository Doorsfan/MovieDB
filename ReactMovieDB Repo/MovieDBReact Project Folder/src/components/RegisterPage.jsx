import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import homeLogo from '/images/home.png';

export default function LoginPage() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [profileimage, setProfileImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = 'user';
    const blocked = 0;
    const lastChangedPassword = Date.now();
    if (username && password && repeatPassword) {
      if (
        password === repeatPassword &&
        username.length >= 8 &&
        password.length >= 8
      ) {
        if (password.replace(/\D/g, '').length >= 3) {
          if (password.replace(/[a-zA-Z0-9 ]/g, '').length >= 3) {
            const token = await registerUser({
              role,
              blocked,
              username,
              password,
              profileimage,
              lastChangedPassword,
            });
            return true;
          } else {
            alert('Password must contain at least 3 special characters.');
            return false;
          }
        } else {
          alert('Password must contain at least 3 numeric characters.');
          return false;
        }
      } else {
        alert(
          'Username must be at least 8 characters long. \nPassword must be at least 8 characters long. \nPassword must match repeated password.'
        );
        return false;
      }
    } else {
      alert('You must fill out credentials to register.');
    }
  };

  async function registerUser(credentials) {
    return fetch('/api/registerNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(async (data) => {
      let myUser = await data.json();
      window.location.pathname = '/';
    });
  }

  return (
    <div>
      <div className='header'>
        <div className='SpaceBlock' />
        <div className='homeText'>
          <Link className='homeLink' to='/'>
            <img className='homeLogo' src={homeLogo} alt='Home' />
          </Link>
        </div>
        <div className='SpaceBlock' />
        <div className='ForumText'>The Music Forum</div>
        <div className='SpaceBlock' />
        <div className='homeText'></div>
      </div>
      <div className='RegisterTitleText'>--=== Register ===--</div>
      <div className='registerFormDiv'>
        <form onSubmit={handleSubmit} className='registerForm'>
          <label>
            <p className='usernameP'>-= Username =-</p>
            <div className='inputGrid'>
              <div className='SpaceBlock' />
              <input
                type='text'
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username..'
              />
              <div className='SpaceBlock' />
            </div>
          </label>
          <label>
            <p className='passwordP'>-= Password =-</p>
            <div className='inputGrid'>
              <div className='SpaceBlock' />
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password..'
              />
              <div className='SpaceBlock' />
            </div>
          </label>
          <label>
            <p className='passwordP'>-= Repeat Password =-</p>
            <div className='inputGrid'>
              <div className='SpaceBlock' />
              <input
                type='password'
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder='Repeat Password..'
              />
              <div className='SpaceBlock' />
            </div>
          </label>
          <label>
            <p className='profileP'>-= Profile URL =-</p>
            <div className='inputGrid'>
              <div className='SpaceBlock' />
              <input
                type='text'
                onChange={(e) => setProfileImage(e.target.value)}
                placeholder='Profile URL..'
              />
              <div className='SpaceBlock' />
            </div>
          </label>
          <button className='registerButton' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
