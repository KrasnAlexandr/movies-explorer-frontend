import './AuthFooter.css';
import { Link } from 'react-router-dom';

export const AuthFooter = ({
  isDisabled,
  authError,
  isLoading,
  isSignupPage = false
}) => {
  const contentParams = {
    signin: {
      buttonTitle: 'Войти',
      text: 'Ещё не зарегистрированы?',
      linkText: 'Регистрация',
      linkHref: '/signup'
    },
    signup: {
      buttonTitle: 'Зарегистрироваться',
      text: 'Уже зарегистрированы?',
      linkText: 'Войти',
      linkHref: '/signin'
    }
  };

  const currentContent = isSignupPage
    ? contentParams.signup
    : contentParams.signin;

  const disabledState = isLoading || isDisabled;

  return (
    <div className='auth__footer'>
      {authError && <p className='auth__error-helper'>{authError}</p>}
      <button
        className={`auth__button ${
          disabledState ? 'auth__button_type_disable' : ''
        }`}
        type='submit'
        title={currentContent.buttonTitle}
        disabled={disabledState}
      >
        {isLoading ? 'Загрузка...' : currentContent.buttonTitle}
      </button>

      <p className='auth__text'>
        {currentContent.text}{' '}
        <Link to={currentContent.linkHref} className='auth__link'>
          {currentContent.linkText}
        </Link>
      </p>
    </div>
  );
};
