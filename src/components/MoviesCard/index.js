import './MoviesCard.css';

export const MoviesCard = ({ data }) => {
  const { trailerLink, image, name, duration } = data;

  const timeConverter = time => {
    if (time < 60) {
      return `${time}м`;
    } else {
      const hours = Math.floor(time / 60);
      const minutes = time - hours * 60;

      return minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`;
    }
  };

  return (
    <div className='movie'>
      <a href={trailerLink} target='_blank'>
        <img className='movie__image' src={image} alt={name} />
      </a>
      <div className='movie__info'>
        <p className='movie__name'>{name}</p>
        <div className='movie__button'>
          <button
            type='button'
            className='movie__like'
            title='добавить фильм'
          />
        </div>
        <p className='movie__duration'>{timeConverter(duration)}</p>
      </div>
    </div>
  );
};
