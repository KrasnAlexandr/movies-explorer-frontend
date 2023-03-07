import styles from './Portfolio.module.css';

export const Portfolio = () => (
  <section className={styles.portfolio}>
    <div className={styles.portfolio__container}>
      <h3 className={styles.portfolio__title}>Портфолио</h3>

      <ul className={styles.portfolio__list}>
        <li className={styles.portfolio__item}>
          <a
            className={styles.portfolio__link}
            href='https://github.com/KrasnAlexandr/how-to-learn'
            target='_blank'
          >
            Статичный сайт
          </a>
        </li>

        <li className={styles.portfolio__item}>
          <a
            className={styles.portfolio__link}
            href='https://github.com/KrasnAlexandr/russian-travel'
            target='_blank'
          >
            Адаптивный сайт
          </a>
        </li>

        <li className={styles.portfolio__item}>
          <a
            className={styles.portfolio__link}
            href='https://github.com/KrasnAlexandr/react-mesto-api-full'
            target='_blank'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  </section>
);
