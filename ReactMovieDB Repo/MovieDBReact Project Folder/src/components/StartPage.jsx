import { useState, useEffect } from 'react';
import placeholder from '/images/placeholder.png';
import ProfileIcon from '/images/profile.png';
import starLogo from '/images/star.png';
import SearchLogo from '/images/glass.png';
import homeLogo from '/images/home.png';

import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

export default function StartPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [movieArticles, setMovieArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedLoading, setCompletedLoading] = useState(false);

  let navigate = useNavigate();

  function logout() {
    fetch(`/api/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (data) => {
      let loggedout = await data.json();
      setLoggedIn(false);
    });
  }

  function searchForArticles(searchTerm) {
    if (searchTerm.length == 0 || searchTerm == '') {
      fetch(`/api/getAllArticles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (data) => {
        let searchResult = await data.json();
        setMovieArticles(searchResult);
      });
    } else {
      fetch(`/api/getSearchedForArticle/` + searchTerm, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (data) => {
        let searchResult = await data.json();
        setMovieArticles(searchResult);
      });
    }
  }

  // Run this when our component mounts (we can see it on screen)
  useEffect(() => {
    (async () => {
      let isMounted = true;

      let allArticles = await (await fetch('/api/getAllArticles')).json();

      setMovieArticles(allArticles);

      let result = await (await fetch('/api/login')).json();
      if (result) {
        fetch(`/api/loggedInUsersUsername`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (data) => {
          let result = await data.json();
          setLoggedInUsername(result);
        });

        fetch(`/api/whoAmI`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (data) => {
          let relevantInfo = await data.json();
          if (isMounted) {
            if (!relevantInfo) {
              setLoggedIn(false);
              setCompletedLoading(true);
            } else {
              setLoggedIn(true);
              setCompletedLoading(true);
            }
          }
        });
      }

      return () => {
        isMounted = false;
      };
    })();
  }, []);

  return (
    <div className='body'>
      <div className='header'>
        <div className='SpaceBlock' />
        <div className='homeText'></div>
        <div className='SpaceBlock' />
        <div className='ForumText'>--=== The Movie DB ===--</div>
        <div className='SpaceBlock' />
        {(!loggedIn && completedLoading) && (
          <div className='loginTextDiv'>
            <Link className='loginLink' to='/Login'>
              Login
            </Link>
          </div>
        )}

        {(loggedIn && completedLoading) && (
          <div className='profileText'>
            <Link className='profileLink' to={`/Profile/${loggedInUsername}`}>
              <img className='ProfileIcon' src={ProfileIcon} />
              <div className='profileTextStartPage'>My Profile</div>
            </Link>
            <div onClick={logout} className='logOutTextStartPage'>
              Logout
            </div>
          </div>
        )}
      </div>
      <div className='searchBarPart'>
        <div className='SpaceBlock' />
        <input
          type='text'
          className='searchBar'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search..'
        />
        <div className='SpaceBlock' />
        <img
          className='SearchIcon'
          onClick={() => searchForArticles(searchTerm)}
          src={SearchLogo}
        />
        <div className='SpaceBlock' />
      </div>
      <main className='startPageBody'>
        {movieArticles.length > 0 &&
          movieArticles.map(
            ({
              id,
              title,
              imageURL,
              Rating,
              created,
              firstTag,
              secondTag,
              thirdTag,
            }) => (
              <Link className='ArticleLink' to={`/Article/${title}`}>
                <div className='movieArticle' key={id}>
                  <div className='movieImageLogoDiv'>
                    <div className='SpaceBlock' />
                    {imageURL.length > 0 && (
                      <img className='movieImageLogo' src={`${imageURL}`} />
                    )}
                    {imageURL.length == 0 && (
                      <img className='movieImageLogo' src={placeholder} />
                    )}
                    <div className='SpaceBlock' />
                    <div className='movieTitleDiv'>{title}</div>
                    <div className='SpaceBlock' />
                    <div className='createdDate'>{created}</div>
                    <div className='SpaceBlock' />
                  </div>
                  <div className='ratingDiv'>
                    <div className='SpaceBlock' />
                    <div className='ratingDiv'>
                      <img
                        className='starImageLogo'
                        src={starLogo}
                        alt='Star'
                      />
                      <div className='ratingText'>{Rating}/5</div>
                    </div>
                    <div className='SpaceBlock' />
                    <div className='firstTagDiv'>{firstTag}</div>
                    <div className='SpaceBlock' />
                    {secondTag.length > 0 && (
                      <div className='secondTagDiv'>{secondTag}</div>
                    )}
                    <div className='SpaceBlock' />
                    {thirdTag.length > 0 && (
                      <div className='thirdTagDiv'>{thirdTag}</div>
                    )}
                    <div className='SpaceBlock' />
                  </div>
                </div>
              </Link>
            )
          )}
      </main>
      <div className='StartFooter'>
        <div className='SpaceBlock' />
        <div className='SpaceBlock' />
        <div className='SpaceBlock' />
        {loggedIn && (
          <Link className='profileLink' to={`/Profile/${loggedInUsername}`}>
            <div className='ProfileDiv'>
              <div className='ProfileText'>Profile</div>
              <img className='ProfileLogo' src={ProfileIcon} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
