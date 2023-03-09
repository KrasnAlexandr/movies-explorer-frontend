import './Menu.css';
import { ProfileButton } from '../ProfileButton';
import { HEADER_NAVIGATION_PARAMS } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const Menu = ({ isMenuOpen, onClick }) => {
  const currentPage = useLocation().pathname;
  const linkClassName = link =>
    `header__menu-link ${
      currentPage === link.href ? 'header__menu-link_type_active' : ''
    }`;

  return (
    <div
      className={`header__menu ${isMenuOpen ? 'header__menu_type_open' : ''}`}
    >
      <div className='header__menu-container'>
        <nav className='header__menu-list'>
          <div className='header__menu-links'>
            {HEADER_NAVIGATION_PARAMS.map(link => {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={linkClassName(link)}
                  onClick={onClick}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <ProfileButton className='header__menu-profile' />
      </div>
    </div>
  );
};
