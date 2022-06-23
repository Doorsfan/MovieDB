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
import UserGroup from '../utilities/UserGroup';

export default function CreateNewArticlePage() {
  const [title, setTitle] = useState();
  const [imageURL, setImageURL] = useState();
  const [firstTag, setFirstTag] = useState();
  const [secondTag, setSecondTag] = useState();
  const [thirdTag, setThirdTag] = useState();
  const [firstActor, setFirstActor] = useState();
  const [secondActor, setSecondActor] = useState();
  const [thirdActor, setThirdActor] = useState();
  const [firstRole, setFirstRole] = useState();
  const [secondRole, setSecondRole] = useState();
  const [thirdRole, setThirdRole] = useState();
  const [rating, setRating] = useState();
  const [ageRating, setAgeRating] = useState();
  const [summary, setSummary] = useState();
  const [author, setAuthor] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newGroup = {
      description: description,
      name: name,
    };

    fetch('/api/createNewArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGroup),
    }).then(async (data) => {
      let myGroupResult = await data.json();

      if (myGroupResult != 'Failed to create the Article.') {
        window.location = '/';
      }
    });
  };

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
      <form onSubmit={handleSubmit} className='registerForm'>
        <label>
          <p>Group Name</p>
          <input type='text' onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <p>Group Description</p>
          <input type='text' onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button className='submitButton' type='submit'>
          Create New Group
        </button>
      </form>
    </div>
  );
}
