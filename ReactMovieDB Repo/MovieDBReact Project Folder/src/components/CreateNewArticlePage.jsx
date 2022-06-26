import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import homeLogo from '/images/home.png';
import ProfileIcon from '/images/profile.png';
import Placeholder from '/images/placeholder.png';

export default function CreateNewArticlePage() {
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
  const [author, setAuthor] = useState('');

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
            setAuthor(result);
          });
        }
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
        <input
          placeholder='The movies title..'
          className='movieTitleInput'
          type='text'
        ></input>
        <div className='PublisherDiv'>
          <div className='PublisherText'>Publisher</div>
          <div className='publisherNameAndImage'>
            <div className='SpaceBlock' />
            <div className='publisherImageDiv'>
              <img className='publisherProfileImage' src={ProfileIcon}></img>
              <div className='publisherName'>{author}</div>
              <div className='ageRatingGrid'>
                <div className='SpaceBlock' />
                <div className='ageRatingText'>Age Rating:</div>
                <div className='SpaceBlock' />
                <select name='ageRatings'>
                  <option value='General Audience'>G</option>
                  <option value='Parental Guidance'>PG</option>
                  <option value='Not for under 13'>PG-13</option>
                  <option value='Under 17 with adult'>R</option>
                  <option value='Never under 17'>Adults only</option>
                </select>
                <div className='SpaceBlock' />
              </div>
            </div>
            <div className='SpaceBlock' />
            <div className='SpaceBlock' />
            <div className='SpaceBlock' />
            <div className='editTags'>
              <div className='editMovieTag'>
                <input placeholder='Tag 1' type='text'></input>
              </div>
              <div className='editMovieTag'>
                <input placeholder='Tag 2 (Optional)' type='text'></input>
              </div>
              <div className='editMovieTag'>
                <input placeholder='Tag 3 (Optional)' type='text'></input>
              </div>
            </div>
          </div>
          <div className='actorsAndRoleGrid'>
            <div className='SpaceBlock' />
            <div className='actorsText'>Actors</div>
            <div className='SpaceBlock' />
            <div className='roleText'>Role</div>
            <div className='SpaceBlock' />
          </div>
          <div className='actorAndRoleDiv'>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Actor 1'></input>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Role 1'></input>
            <div className='SpaceBlock' />
          </div>
          <div className='actorAndRoleDiv'>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Actor 2 (Optional)'></input>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Role 2 (Optional)'></input>
            <div className='SpaceBlock' />
          </div>
          <div className='actorAndRoleDiv'>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Actor 3 (Optional)'></input>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Role 3 (Optional)'></input>
            <div className='SpaceBlock' />
          </div>
          <div className='actorAndRoleDiv'>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Actor 4 (Optional)'></input>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Role 4 (Optional)'></input>
            <div className='SpaceBlock' />
          </div>
          <div className='actorAndRoleDiv'>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Actor 5 (Optional)'></input>
            <div className='SpaceBlock' />
            <input type='text' placeholder='Role 5 (Optional)'></input>
            <div className='SpaceBlock' />
          </div>
        </div>
        <div className='imageAndUrlGrid'>
          <div className='SpaceBlock' />
          <img className='movieImageHolder' src={Placeholder} />
          <div className='SpaceBlock' />
          <div className='movieURLInputDiv'>
            <input
              className='movieURLInput'
              type='text'
              placeholder='Movie picture URL goes here..'
            ></input>
            <button className='uploadImageURLButton' value='Upload Image URL'>
              Upload Image URL
            </button>
          </div>
        </div>
        <div className='plotSummaryDiv'>Plot Summary</div>
        <textarea
          onChange={(e) => setSummary(e.target.value)}
          className='summaryInput'
          placeholder='A summary of the plot..'
          rows='5'
          cols='50'
        ></textarea>
        <button value='Publish' className='publishArticleButton'>
          Publish
        </button>
      </main>
      <div className='footer'>
        <div className='SpaceBlock' />
        <div className='HomeDiv'>
          <div className='HomeText'>Home</div>
          <img className='HomeLogo' src={homeLogo} />
        </div>
        <div className='SpaceBlock' />
        <div className='ProfileDiv'>
          <div className='ProfileText'>Profile</div>
          <img className='ProfileLogo' src={ProfileIcon} />
        </div>
      </div>
    </div>
  );
}
