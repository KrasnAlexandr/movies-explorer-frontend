import styles from './Techs.module.css';
import { SectionTitle } from '../common/SectionTitle';
import { TECHS_PARAMS } from '../../utils/constants';

export const Techs = () => (
  <section className={styles.techs}>
    <div className={styles.techs__container}>
      <SectionTitle>Технологии</SectionTitle>
      <div className={styles.techs__text}>
        <h3 className={styles.techs__subtitle}>7 технологий</h3>
        <p className={styles.techs__descriptions}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>

      <ul className={styles.techs__table}>
        {TECHS_PARAMS.map(item => (
          <a
            key={item.label}
            href={item.href}
            target='_blank'
            className={styles.techs__link}
          >
            <li className={styles.techs__item}>{item.label}</li>
          </a>
        ))}
      </ul>
    </div>
  </section>
);
