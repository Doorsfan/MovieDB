import { useState, useEffect } from 'react';
import homeLogo from '/images/home.png';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';

export default function LoginPage() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
  };

  async function loginUser(credentials) {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(async (data) => {
      let myUser = await data.json();
      console.log(myUser);
      if (myUser._error) {
        alert('Incorrect credentials.');
      } else if (myUser.needToUpdate) {
        delete myUser.needToUpdate;

        //GETs to DB instead of Session Storage
        // UseEffect to check if a User is logged in
        window.location.pathname = `/updateUserInfo/${myUser.id}`;
      } else {
        window.location.pathname = '/';
      }
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
        <div className='ForumText'>--=== The Movie DB ===--</div>
        <div className='SpaceBlock' />
        <div className='homeText'></div>
      </div>
      <div>
        <div className='loginText'>--=== Login ===--</div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='loginForm'>
          <label>
            <p className='usernameText'>-= Username =-</p>
            <input type='text' onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p className='passwordText'>-= Password =-</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className='registerDiv'>
            <button className='loginButton' type='submit'>
              Login
            </button>
          </div>
          <div className='registerLinkDiv'>
            <Link className='registerLink' to='/Register'>
              Register a New Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
