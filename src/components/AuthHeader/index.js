import './AuthHeader.css';
import { MainLogo } from '../MainLogo';

export const AuthHeader = ({ isSignupPage }) => (
  <div className='auth__header'>
    <MainLogo />
    <h1 className='auth__title'>
      {isSignupPage ? 'Добро пожаловать!' : 'Рады видеть!'}
    </h1>
  </div>
);
