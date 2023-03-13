import './Portfolio.css';

const portfolioWorks = [
  {
    href: 'https://github.com/KrasnAlexandr/how-to-learn',
    label: 'Статичный сайт'
  },
  {
    href: 'https://github.com/KrasnAlexandr/russian-travel',
    label: 'Адаптивный сайт'
  },
  {
    href: 'https://github.com/KrasnAlexandr/react-mesto-api-full',
    label: 'Одностраничное приложение'
  }
];

export const Portfolio = () => (
  <section className='portfolio'>
    <div className='portfolio__container'>
      <h3 className='portfolio__title'>Портфолио</h3>

      <ul className='portfolio__list'>
        {portfolioWorks.map(work => {
          return (
            <li key={work.href} className='portfolio__item'>
              <a className='portfolio__link' href={work.href} target='_blank'>
                {work.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
