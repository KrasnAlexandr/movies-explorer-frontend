import styles from './Header.module.css';
import { MainLogo } from '../MainLogo';
import { useLocation } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Navigation } from '../Navigation';
import { AuthHeaderButtons } from '../AuthHeaderButtons';
export const Header = () => {
  const currentPage = useLocation().pathname;
  const currentUser = useContext(CurrentUserContext);

  const isAuthPage =
    currentPage === PAGE_MANAGER.SIGNIN || currentPage === PAGE_MANAGER.SIGNUP;

  return (
    <>
      {isAuthPage ? (
        <></>
      ) : (
        <header
          className={`${styles.header} ${
            currentUser ? styles.header_type_isauth : ''
          }`}
        >
          <div className={styles.header__container}>
            <MainLogo />
            {currentUser ? <Navigation /> : <AuthHeaderButtons />}
          </div>
        </header>
      )}
    </>
  );
};
