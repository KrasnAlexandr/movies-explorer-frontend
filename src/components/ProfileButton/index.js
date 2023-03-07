import styles from './ProfileButton.module.css';
import { PAGE_MANAGER } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const ProfileButton = ({ isHeaderButton, className }) => (
  <Link
    to={PAGE_MANAGER.PROFILE}
    className={`${styles.navigation__profile} ${className} ${
      isHeaderButton ? styles.navigation__profile_type_hidden : ''
    }`}
  >
    Аккаунт
  </Link>
);
