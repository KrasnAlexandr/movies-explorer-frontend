import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/Api/MainApi';
import { LOCAL_STORAGE_MAP, PAGE_MANAGER } from '../../utils/constants';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrenUser, hasToken, setHasToken] =
    useContext(CurrentUserContext);

  useEffect(() => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_MAP.JWT_TOKEN);
    if (jwt) {
      setHasToken(true);
      mainApi.getUserInfo(jwt).then(userInfo => setCurrenUser(userInfo));
    } else {
      navigate(PAGE_MANAGER.HOME);
    }
  }, []);

  return <>{children}</>;
};
