import { useState, useEffect } from 'react';

// a subclass to FetchHelper
import Thread from './utilities/Thread';

// a "lazy"/automatically created subclass to FetchHelper
import { factory } from './utilities/FetchHelper';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StartPage from './components/StartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import CreateNewArticlePage from './components/CreateNewArticlePage';
import ArticlePage from './components/ArticlePage';
import CreateNewThreadPage from './components/createNewThreadPage';
import ThreadPage from './components/ThreadPage';
import GroupListingPage from './components/GroupListingPage';

const { Book, Author } = factory;

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<StartPage />} />
          <Route exact path='/Login' element={<LoginPage />} />
          <Route exact path='/Register' element={<RegisterPage />} />
          <Route exact path='/Profile/:profileName' element={<ProfilePage />} />
          <Route exact path='/Article/:movieName' element={<ArticlePage />} />
          <Route
            exact
            path='/createNewArticle'
            element={<CreateNewArticlePage />}
          />
          <Route
            exact
            path='/CreateNewThread/:groupName'
            element={<CreateNewThreadPage />}
          />
          <Route
            exact
            path='/postsForThread/:threadName'
            element={<ThreadPage />}
          />
          <Route
            exact
            path='/memberListing/:groupName'
            element={<GroupListingPage />}
          />
        </Routes>
      </Router>
    </>
  );
}
