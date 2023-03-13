import './Promo.css';
export const Promo = () => (
  <section className='promo'>
    <div className='promo__container'>
      <div className='promo__image' />
      <h1 className='promo__title promo__title_type_web'>
        Учебный проект студента факультета <br />
        Веб-разработки.
      </h1>
      <h1 className='promo__title promo__title_type_tablet'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className='promo__text'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>

      <a className='promo__button' title='Узнать больше' href='#about'>
        Узнать больше
      </a>
    </div>
  </section>
);
