import './AboutProject.css';
import { SectionTitle } from '../common/SectionTitle';
export const AboutProject = () => (
  <section className='project' id='about'>
    <div className='project__container'>
      <SectionTitle className='project__title'>О проекте</SectionTitle>
      <ul className='project__content'>
        <li className='project__item'>
          <h3 className='project__item-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='project__item-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>

        <li className='project__item'>
          <h3 className='project__item-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='project__item-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className='project__progressbar'>
        <div className='project__progressbar-share project__progressbar-share_type_front'>
          <p>1 неделя</p>
        </div>

        <div className='project__progressbar-share project__progressbar-share_type_back'>
          <p>4 недели</p>
        </div>
      </div>

      <div className='project__side-text'>
        <p className='project__text project__text_type_front'>Back-end</p>
        <p className='project__text project__text_type_back'>Front-end</p>
      </div>
    </div>
  </section>
);
