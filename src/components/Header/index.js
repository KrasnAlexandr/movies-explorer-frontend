import './Header.css';
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

  const isHomePage = currentPage === PAGE_MANAGER.HOME;

  return (
    <>
      {isAuthPage ? (
        <></>
      ) : (
        <header className={`header ${isHomePage ? 'header_type_green' : ''}`}>
          <div className='header__container'>
            <MainLogo className='header__logo' />
            {currentUser ? <Navigation /> : <AuthHeaderButtons />}
          </div>
        </header>
      )}
    </>
  );
};
