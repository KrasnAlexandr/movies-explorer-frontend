import styles from './Promo.module.css';
export const Promo = () => (
  <section className={styles.promo}>
    <div className={styles.promo__container}>
      <div className={styles.promo__image} />
      <h1 className={styles.promo__title_type_web}>
        Учебный проект студента факультета <br />
        Веб-разработки.
      </h1>
      <h1 className={styles.promo__title_type_tablet}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className={styles.promo__text}>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>

      <a href='#about'>
        <button
          className={styles.promo__button}
          type='button'
          title='Узнать больше'
        >
          Узнать больше
        </button>
      </a>
    </div>
  </section>
);
