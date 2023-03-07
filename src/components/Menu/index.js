import styles from './Menu.module.css';
import { ProfileButton } from '../ProfileButton';
import { HEADER_NAVIGATION_PARAMS } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const Menu = ({ isMenuOpen, onClick }) => {
  const currentPage = useLocation().pathname;
  const linkClassName = link =>
    `${styles.menu__link} ${
      currentPage === link.href ? styles.menu__link_type_active : ''
    }`;

  return (
    <div
      className={`${styles.menu} ${isMenuOpen ? styles.menu_type_open : ''}`}
    >
      <div className={styles.menu__container}>
        <nav className={styles.menu__list}>
          <div className={styles.menu__links}>
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

        <ProfileButton className={styles.menu_profile} />
      </div>
    </div>
  );
};
