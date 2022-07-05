

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StartPage from './components/StartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import CreateNewArticlePage from './components/CreateNewArticlePage';
import ArticlePage from './components/ArticlePage';



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
        </Routes>
      </Router>
    </>
  );
}
