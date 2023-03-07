import styles from './AuthHeaderButtons.module.css';
import { Link } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const AuthHeaderButtons = () => (
  <div className={styles.header__buttons}>
    <Link to={PAGE_MANAGER.SIGNUP}>
      <button type='button' title='sign up' className={styles.header__signup}>
        Регистрация
      </button>
    </Link>
    <Link to={PAGE_MANAGER.SIGNIN}>
      <button type='button' title='sign in' className={styles.header__signin}>
        Войти
      </button>
    </Link>
  </div>
);
