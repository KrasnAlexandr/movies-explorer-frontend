import './Techs.css';
import { SectionTitle } from '../common/SectionTitle';
import { TECHS_PARAMS } from '../../utils/constants';

export const Techs = () => (
  <section className='techs'>
    <div className='techs__container'>
      <SectionTitle className='techs__title'>Технологии</SectionTitle>
      <div className='techs__text'>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__descriptions'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>

      <ul className='techs__table'>
        {TECHS_PARAMS.map(item => (
          <li key={item.label} className='techs__item'>
            <a href={item.href} className='techs__link'>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
