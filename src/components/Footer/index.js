import './Footer.css';
import { useLocation } from 'react-router-dom';
import { GITHUB_LINK, PAGE_MANAGER } from '../../utils/constants';

export const Footer = () => {
  const currentPage = useLocation().pathname;

  const isAuthPage =
    currentPage === PAGE_MANAGER.SIGNIN || currentPage === PAGE_MANAGER.SIGNUP;

  const isProfilePage = currentPage === PAGE_MANAGER.PROFILE;

  return (
    <>
      {isAuthPage || isProfilePage ? (
        <></>
      ) : (
        <footer className='footer'>
          <div className='footer__container'>
            <h4 className='footer__title'>
              Учебный проект Яндекс.Практикум х BeatFilm.
            </h4>
            <div className='footer__content'>
              <p>© 2023</p>
              <div className='footer__links'>
                <a
                  href='https://practicum.yandex.ru'
                  target='_blank'
                  className='footer__link'
                >
                  Яндекс.Практикум
                </a>
                <a href={GITHUB_LINK} target='_blank' className='footer__link'>
                  Github
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
