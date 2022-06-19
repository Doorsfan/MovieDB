import { useState, useEffect } from 'react';

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
import homeLogo from '/images/home.png';
import ProfileIcon from '/images/profile.png';
import StarImage from '/images/star.png';

// a "lazy"/automatically created subclass to FetchHelper
import { factory } from '../utilities/FetchHelper';

const { Book, Author } = factory;

export default function GroupPage() {
  const [imageURL, setImageURL] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [firstTag, setFirstTag] = useState('');
  const [secondTag, setSecondTag] = useState('');
  const [thirdTag, setThirdTag] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [ageRating, setAgeRating] = useState('');
  const [firstRole, setFirstRole] = useState('');
  const [secondRole, setSecondRole] = useState('');
  const [thirdRole, setThirdRole] = useState('');
  const [firstActor, setFirstActor] = useState('');
  const [secondActor, setSecondActor] = useState('');
  const [thirdActor, setThirdActor] = useState('');
  const [summary, setSummary] = useState('');

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
      navigate('/');
    });
  }

  function goToCreateThreadPage() {
    navigate('/CreateNewThread/' + window.location.pathname.split('/')[2]);
  }

  function goToThread(threadName) {
    navigate('/postsForThread/' + threadName);
  }

  // Run this when our component mounts (we can see it on screen)
  useEffect(() => {
    (async () => {
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

        fetch(
          `/api/getInfoForMovie/` + window.location.pathname.split('/')[2],
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(async (data) => {
          let result = await data.json();
          console.log(result);
          setImageURL(result.imageURL);
          setTitle(result.title);
          setFirstTag(result.firstTag);
          setSecondTag(result.secondTag);
          setThirdTag(result.thirdTag);
          setRating(result.Rating);
          setAgeRating(result.ageRating);
          setFirstRole(result.firstRole);
          setSecondRole(result.secondRole);
          setThirdRole(result.thirdRole);
          setFirstActor(result.firstActor);
          setSecondActor(result.secondActor);
          setThirdActor(result.thirdActor);
          setSummary(result.summary);
        });
      });
    })();
  }, []);

  return (
    <div className='body'>
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
        {!loggedIn && (
          <div className='loginTextArticlePage'>
            <Link className='loginLink' to='/Login'>
              Login
            </Link>
          </div>
        )}
        {loggedIn && (
          <div className='profileText'>
            <Link className='profileLink' to={`/Profile/${loggedInUsername}`}>
              <img className='ProfileIcon' src={ProfileIcon} />
              <div className='myProfileText'>My Profile</div>
            </Link>
            <div onClick={logout} className='logOutTextStartPage'>
              Logout
            </div>
          </div>
        )}
      </div>
      <main className='articleMain'>
        <img className='articleImage' src={imageURL} />
        <div className='movieTitleDiv'>{title}</div>
        <div className='tagsGrid'>
          <div className='SpaceBlock' />
          <div className='firstTag movieTag'>{firstTag}</div>
          <div className='SpaceBlock' />
          <div className='secondTag movieTag'>{secondTag}</div>
          <div className='SpaceBlock' />
          <div className='thirdTag movieTag'>{thirdTag}</div>
          <div className='SpaceBlock' />
        </div>
        <div className='actorsAndStarsGrid'>
          <div className='SpaceBlock' />
          <div className='actorsAndRolesDiv'>Actors/Roles:</div>
          <div className='SpaceBlock' />
          <div className='starsDiv'>
            <div className='StarsText'>Stars</div>
            <div className='starDiv'>
              <img className='starRatingImage' src={StarImage} />
              <div className='starRatingDiv'>{rating} / 5</div>
            </div>
          </div>
        </div>
        <div className='rolesGrid'>
          <div className='SpaceBlock' />
          <div className='actorsAndRolesDiv'>
            <div className='firstActorDiv'>
              {firstActor}: {firstRole}
            </div>
            {secondActor.length > 0 && (
              <div className='secondActorDiv'>
                {secondActor}: {secondRole}
              </div>
            )}
            {thirdActor.length > 0 && (
              <div className='thirdActorDiv'>
                {thirdActor}: {thirdRole}
              </div>
            )}
          </div>
          <div className='SpaceBlock' />
          <div className='ageRatingDiv'>Age Rating: {ageRating}</div>
          <div className='SpaceBlock' />
        </div>
        <div className='plotSummary'>
          Plot Summary
        </div>
        <div className='summaryText'>
          {summary}
        </div>
      </main>
    </div>
  );
}