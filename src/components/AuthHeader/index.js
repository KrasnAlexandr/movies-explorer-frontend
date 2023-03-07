import styles from './AuthHeader.module.css';
import { MainLogo } from '../MainLogo';

export const AuthHeader = ({ isSignupPage }) => (
  <div className={styles.auth__header}>
    <MainLogo />
    <h1 className={styles.auth__title}>
      {isSignupPage ? 'Добро пожаловать!' : 'Рады видеть!'}
    </h1>
  </div>
);
