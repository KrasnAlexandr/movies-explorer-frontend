import './Auth.css';
import { AuthHeader } from '../AuthHeader';
import { AuthForm } from '../AuthForm';
import { AuthFooter } from '../AuthFooter';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import authApi from '../../utils/Api/AuthApi';
import { PAGE_MANAGER } from '../../utils/constants';
import MainApi from '../../utils/Api/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export const Auth = ({ isSignupPage }) => {
  const navigate = useNavigate();
  const currentPage = useLocation().pathname;
  const [currentUser, setCurrenUser, hasToken, setHasToken] =
    useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();

  const signInAndSaveJwt = async () => {
    await authApi.signIn(values).then(res => {
      localStorage.setItem('jwt', res.token);
      MainApi.getUserInfo(res.token).then(res => {
        setCurrenUser(res);
        setHasToken(true);
        navigate(PAGE_MANAGER.MOVIES);
      });
    });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    if (currentPage === PAGE_MANAGER.SIGNUP) {
      authApi
        .signUp(values)
        .then(() => signInAndSaveJwt())
        .catch(err => setAuthError(err.message))
        .finally(() => setIsLoading(false));
    } else {
      signInAndSaveJwt()
        .catch(err => setAuthError(err.message))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    resetForm();
    setAuthError(null);
  }, [currentPage]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate(PAGE_MANAGER.HOME);
    }
  }, []);

  return (
    <div className='auth'>
      <AuthHeader isSignupPage={isSignupPage} />
      <AuthForm
        handleSubmit={handleSubmit}
        values={values}
        handleChange={handleChange}
        errors={errors}
        isSignupPage={isSignupPage}
      >
        <AuthFooter
          authError={authError}
          isSignupPage={isSignupPage}
          isDisabled={!isValid}
          isLoading={isLoading}
        />
      </AuthForm>
    </div>
  );
};
