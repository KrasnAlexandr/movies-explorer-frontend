import './AboutMe.css';
import { SectionTitle } from '../common/SectionTitle';
import myPhoto from '../../images/me.png';
import { GITHUB_LINK } from '../../utils/constants';
export const AboutMe = () => (
  <section className='about'>
    <div className='about__container'>
      <SectionTitle className='about__title'>Студент</SectionTitle>
      <div className='about__information'>
        <img className='about__photo' src={myPhoto} alt='my photo' />

        <h3 className='about__name'>Александр</h3>

        <p className='about__profession'>Фронтенд-разработчик, 28 лет</p>

        <p className='about__truestory'>
          Я родился и живу в Таганроге, закончил факультет экономики ЮФУ. У меня
          есть жена и сын. Я люблю слушать музыку, а ещё люблю вкусно покушать.
          С 2018 года являюсь предприниматель. Во время прохождения курс по
          веб-разработке, еще больше полюбил программирование.
        </p>
        <a href={GITHUB_LINK} className='about__link' target='_blank'>
          Github
        </a>
      </div>
    </div>
  </section>
);
