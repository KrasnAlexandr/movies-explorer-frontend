import './Auth.css';
import { AuthHeader } from '../AuthHeader';
import { AuthForm } from '../AuthForm';
import { AuthFooter } from '../AuthFooter';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import authApi from '../../utils/Api/AuthApi';
import { LOCAL_STORAGE_MAP, PAGE_MANAGER } from '../../utils/constants';
import MainApi from '../../utils/Api/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { checkingEmailForValidity } from '../../utils';

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
      localStorage.setItem(LOCAL_STORAGE_MAP.JWT_TOKEN, res.token);
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
    const jwt = localStorage.getItem(LOCAL_STORAGE_MAP.JWT_TOKEN);
    if (jwt) {
      navigate(PAGE_MANAGER.HOME);
    }
  }, []);

  const isValidEmail = useMemo(() => {
    if (values.email) return checkingEmailForValidity(values.email);
  }, [values]);

  const isSubmitButtonDisable = !isValid || !isValidEmail;

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
          isDisabled={isSubmitButtonDisable}
          isLoading={isLoading}
        />
      </AuthForm>
    </div>
  );
};
