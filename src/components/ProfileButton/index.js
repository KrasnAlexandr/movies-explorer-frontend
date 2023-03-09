import './ProfileButton.css';
import { PAGE_MANAGER } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const ProfileButton = ({ isHeaderButton, className }) => (
  <Link
    to={PAGE_MANAGER.PROFILE}
    className={`header__profile-button ${className} ${
      isHeaderButton ? 'header__profile-button_type_hidden' : ''
    }`}
  >
    Аккаунт
  </Link>
);
