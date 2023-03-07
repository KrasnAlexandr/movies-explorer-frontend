import styles from './Navigation.module.css';
import { Link, useLocation } from 'react-router-dom';
import { HEADER_NAVIGATION_PARAMS } from '../../utils/constants';
import { ProfileButton } from '../ProfileButton';
import { Burger } from '../Burger';
import { useState } from 'react';
import { Menu } from '../Menu';

export const Navigation = () => {
  const currentPage = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClassName = link =>
    `${styles.navigation__link} ${
      currentPage === link.href ? styles.navigation__link_type_active : ''
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(state => !state);
  };

  return (
    <>
      <nav className={styles.navigation}>
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
