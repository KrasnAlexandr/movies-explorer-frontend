import styles from './AboutMe.module.css';
import { SectionTitle } from '../common/SectionTitle';
import myPhoto from '../../images/me.png';
import { GITHUB_LINK } from '../../utils/constants';
export const AboutMe = () => (
  <section className={styles.about}>
    <div className={styles.about__container}>
      <SectionTitle>Студент</SectionTitle>
      <div className={styles.about__information}>
        <img className={styles.about__photo} src={myPhoto} alt='my photo' />

        <h3 className={styles.about__name}>Александр</h3>

        <p className={styles.about__profession}>Фронтенд-разработчик, 28 лет</p>

        <p className={styles.about__truestory}>
          Я родился и живу в Таганроге, закончил факультет экономики ЮФУ. У меня
          есть жена и сын. Я люблю слушать музыку, а ещё люблю вкусно покушать.
          С 2018 года являюсь предприниматель. Во время прохождения курс по
          веб-разработке, еще больше полюбил программирование.
        </p>
        <a href={GITHUB_LINK} className={styles.about__link} target='_blank'>
          Github
        </a>
      </div>
    </div>
  </section>
);
