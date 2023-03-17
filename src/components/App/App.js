import { Header } from '../Header';
import { Auth } from '../Auth';
import { Main } from '../../pages/Main';
import { Movies } from '../../pages/Movies';
import { SavedMovies } from '../../pages/SavedMovies';
import { Profile } from '../../pages/Profile';
import { Footer } from '../Footer';
import { Route, Routes } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import { NotFound } from '../../pages/NotFound';
import mainApi from '../../utils/Api/MainApi';

function App() {
  const [currentUser, setCurrenUser] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setHasToken(true);
      mainApi.getUserInfo(jwt).then(userInfo => setCurrenUser(userInfo));
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={[currentUser, setCurrenUser, hasToken, setHasToken]}
    >
      <Header />
      <main>
        <Routes>
          <Route path={PAGE_MANAGER.HOME} element={<Main />} />
          <Route path={PAGE_MANAGER.MOVIES} element={<Movies />} />
          <Route path={PAGE_MANAGER.SAVED_MOVIES} element={<SavedMovies />} />
          <Route path={PAGE_MANAGER.PROFILE} element={<Profile />} />
          <Route path={PAGE_MANAGER.SIGNIN} element={<Auth />} />
          <Route path={PAGE_MANAGER.SIGNUP} element={<Auth isSignupPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
