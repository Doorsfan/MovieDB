import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import FetchHelper from '../utilities/FetchHelper';
import placeholder from '/images/placeholder.png';
import starLogo from '/images/star.png';

export default function ProfilePage() {
  const [userRole, setUserRole] = useState();
  const [username, setUserName] = useState();
  const [myArticles, setMyArticles] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let loggedIn = await (await fetch('/api/login')).json();
      fetch(`/api/getUserInfo/${loggedIn?.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (data) => {
        let relevantUserInfo = await data.json();
        setUserName(relevantUserInfo.username);

        fetch(`/api/getMyArticles/` + relevantUserInfo.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (data) => {
          let relevantInfo = await data.json();

          setMyArticles(relevantInfo);
        });
      });
    })();
  }, []);
  return (
    <div>
      <div className='header'>
        <div className='SpaceBlock' />
        <div className='homeText'></div>
        <div className='SpaceBlock' />
        <div className='ForumText'>The Music Forum</div>
        <div className='SpaceBlock' />
        <div className='homeText'>
          <Link className='homeLink' to='/'>
            Home
          </Link>
        </div>
      </div>
      <div className='createNewGroupDiv'>
        <Link className='createNewGroupLink' to='/createNewGroup'>
          Create New Group
        </Link>
      </div>
      {userRole && <div className='roleText'>Site Role: {userRole}</div>}
      {username && <div className='usernameText'>Username: {username}</div>}
      {myArticles.length > 0 && (
        <div className='articlesText'>
          <div className='myArticlesText'>My Articles</div>
          {myArticles.length > 0 &&
            myArticles.map(
              ({
                id,
                title,
                created,
                Rating,
                firstTag,
                secondTag,
                thirdTag,
              }) => (
                <Link className='ArticleLink' to={`/Article/${title}`}>
                  <div className='profileMovieArticle' key={id}>
                    <div className='movieImageLogoDiv'>
                      <div className='SpaceBlock' />
                      <img
                        className='movieImageLogo'
                        src={placeholder}
                        alt='Home'
                      />
                      <div className='SpaceBlock' />
                      <div className='profileMovieTitleDiv'>{title}</div>
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
                      <div className='secondTagDiv'>{secondTag}</div>
                      <div className='SpaceBlock' />
                      <div className='thirdTagDiv'>{thirdTag}</div>
                      <div className='SpaceBlock' />
                    </div>
                  </div>
                </Link>
              )
            )}
        </div>
      )}
    </div>
  );
}
