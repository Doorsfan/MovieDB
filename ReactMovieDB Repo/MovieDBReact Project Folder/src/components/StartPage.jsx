import { useState, useEffect } from 'react';
import placeholder from '/images/placeholder.png';
import ProfileIcon from '/images/profile.png';
import starLogo from '/images/star.png';
import SearchLogo from '/images/glass.png';

// a subclass to FetchHelper
import Thread from '../utilities/Thread';
import UserGroup from '../utilities/UserGroup';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';

// a "lazy"/automatically created subclass to FetchHelper
import { factory } from '../utilities/FetchHelper';

const { Book, Author } = factory;

export default function StartPage() {
  const [threads, setThreads] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [alreadyPartOfGroups, setAlreadyPartOfGroups] = useState([]);
  const [joinedNewGroup, setJoinedNewGroup] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [movieArticles, setMovieArticles] = useState([]);

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

  function leaveGroup(name) {
    let relevantInfo = {
      name: window.location.pathname.split('/')[2],
    };

    fetch(`/api/leaveGroup/` + name, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(relevantInfo),
    }).then(async (data) => {
      let response = await data.json();
    });

    fetch(`api/getGroupsIAmPartOf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (data) => {
      setAlreadyPartOfGroups(await data.json());
    });
  }

  function joinGroup(groupName) {
    let groupInfo = {
      name: groupName,
    };
    fetch(`api/joinGroup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupInfo),
    }).then(async (data) => {
      setJoinedNewGroup(true);
    });

    fetch(`api/getGroupsIAmPartOf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (data) => {
      setAlreadyPartOfGroups(await data.json());
    });
  }

  const renderJoinButton = (name) => {
    let foundName = false;
    if (loggedIn) {
      for (let e = 0; e < alreadyPartOfGroups.length; e++) {
        if (name == alreadyPartOfGroups[e]) {
          foundName = true;
          return (
            <button
              onClick={() => leaveGroup(name)}
              className='joinGroupButton'
            >
              Leave Group
            </button>
          );
        }
      }
      if (!foundName) {
        return (
          <button
            onClick={async () => joinGroup(name)}
            className='joinGroupButton'
          >
            Join Group
          </button>
        );
      }
    }
  };

  // Run this when our component mounts (we can see it on screen)
  useEffect(() => {
    (async () => {
      let myArticles = [];
      let newArticle = {
        title: 'Pirates of The Caribbean',
        rating: 4.3,
        created: '2022-10-02',
        firstTag: 'Action',
        secondTag: 'Pirates',
        thirdTag: 'Johny Depp',
      };
      myArticles.push(newArticle);
      setMovieArticles(myArticles);

      fetch(`api/getAllGroups/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (data) => {
        let result = await data.json();
        setUserGroups(result);
      });
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
          if (!relevantInfo) {
            setLoggedIn(false);
          } else {
            setLoggedIn(true);
          }
        });

        fetch(`api/getGroupsIAmPartOf`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (data) => {
          setAlreadyPartOfGroups(await data.json());
        });
      }
    })();
  }, [alreadyPartOfGroups]);

  return (
    <div className='body'>
      <div className='header'>
        <div className='SpaceBlock' />
        <div className='homeText'></div>
        <div className='SpaceBlock' />
        <div className='ForumText'>--=== The Movie DB ===--</div>
        <div className='SpaceBlock' />
        {!loggedIn && (
          <div className='loginTextDiv'>
            <Link className='loginLink' to='/Login'>
              Login
            </Link>
          </div>
        )}

        {loggedIn && (
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
        <input type='text' className='searchBar' placeholder='Search..' />
        <div className='SpaceBlock' />
        <img className='SearchIcon' src={SearchLogo} />
        <div className='SpaceBlock' />
      </div>
      <main className='startPageBody'>
        {movieArticles.length > 0 &&
          movieArticles.map(
            ({ id, title, rating, created, firstTag, secondTag, thirdTag }) => (
              <Link className='ArticleLink' to={`/Article/${title}`}>
                <div className='movieArticle' key={id}>
                  <div className='movieImageLogoDiv'>
                    <div className='SpaceBlock' />
                    <img
                      className='movieImageLogo'
                      src={placeholder}
                      alt='Home'
                    />
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
                      <div className='ratingText'>{rating}/5</div>
                    </div>
                    <div className='SpaceBlock' />
                    <div className='firstTagDiv'>{firstTag}</div>
                    <div className='SpaceBlock' />
                    <div className='secondTagDiv'>{secondTag}</div>
                    <div className='SpaceBlock' />
                    <div className='thirdTagDiv'>{thirdTag}</div>
                    <div className='SpaceBlock' />
                  </div>
                </div>
              </Link>
            )
          )}
      </main>
    </div>
  );
}
