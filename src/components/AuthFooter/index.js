import './AuthFooter.css';
import { Link } from 'react-router-dom';

export const AuthFooter = ({ isDisabled, isSignupPage = false }) => {
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

  return (
    <div className='auth__footer'>
      <button
        className='auth__button'
        type='submit'
        title={currentContent.buttonTitle}
        disabled={isDisabled}
      >
        {currentContent.buttonTitle}
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
