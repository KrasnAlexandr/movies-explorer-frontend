import styles from './ErrorPage.module.css';
import { Link } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const ErrorPage = () => (
  <div className={styles.error}>
    <div className={styles.error__container}>
      <h3 className={styles.error__title}>404</h3>
      <p className={styles.error__text}>Страница не найдена</p>
    </div>
    <Link to={PAGE_MANAGER.HOME} className={styles.error__button}>
      Назад
    </Link>
  </div>
);
