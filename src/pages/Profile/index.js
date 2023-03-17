import { ProfileContent } from '../../components/Profile';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/Api/MainApi';
import { PAGE_MANAGER } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrenUser, hasToken, setHasToken] =
    useContext(CurrentUserContext);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setHasToken(true);
      mainApi.getUserInfo(jwt).then(userInfo => setCurrenUser(userInfo));
    } else {
      navigate(PAGE_MANAGER.HOME);
    }
  }, []);

  return (
    <>
      <ProfileContent />
    </>
  );
};
