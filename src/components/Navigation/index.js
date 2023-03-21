import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import { HEADER_NAVIGATION_PARAMS } from '../../utils/constants';
import { ProfileButton } from '../ProfileButton';
import { Burger } from '../Burger';
import { useEffect, useState } from 'react';
import { Menu } from '../Menu';

export const Navigation = () => {
  const currentPage = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClassName = link =>
    `header__navigation-link ${
      currentPage === link.href ? 'header__navigation-link_type_active' : ''
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(state => !state);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPage]);

  return (
    <>
      <nav className='header__navigation'>
        {HEADER_NAVIGATION_PARAMS.map((link, index) => {
          if (index !== 0) {
            return (
              <Link
                key={link.href}
                to={link.href}
                className={linkClassName(link)}
              >
                {link.label}
              </Link>
            );
          }
        })}
      </nav>
      <ProfileButton isHeaderButton />
      <Burger isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      <Menu isMenuOpen={isMenuOpen} onClick={toggleMenu} />
    </>
  );
};
