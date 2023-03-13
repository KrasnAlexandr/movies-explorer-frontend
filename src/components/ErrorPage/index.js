import './ErrorPage.css';
import { Link } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const ErrorPage = () => (
  <div className='error'>
    <div className='error__container'>
      <h3 className='error__title'>404</h3>
      <p className='error__text'>Страница не найдена</p>
    </div>
    <Link to={PAGE_MANAGER.HOME} className='error__button'>
      Назад
    </Link>
  </div>
);
