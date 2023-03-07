import styles from './AboutProject.module.css';
import { SectionTitle } from '../common/SectionTitle';
export const AboutProject = () => (
  <section className={styles.project} id='about'>
    <div className={styles.project__container}>
      <SectionTitle>О проекте</SectionTitle>
      <ul className={styles.project__content}>
        <li className={styles.project__item}>
          <h3 className={styles.item__title}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={styles.item__text}>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>

        <li className={styles.project__item}>
          <h3 className={styles.item__title}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={styles.item__text}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className={styles.project__progressbar}>
        <div
          className={`${styles.progressbar__share} ${styles.progressbar__front}`}
        >
          <p>1 неделя</p>
        </div>

        <div
          className={`${styles.progressbar__share} ${styles.progressbar__back}`}
        >
          <p>4 недели</p>
        </div>
      </div>

      <div className={styles.project__text}>
        <p className={styles.text__front}>Back-end</p>
        <p className={styles.text__back}>Front-end</p>
      </div>
    </div>
  </section>
);
