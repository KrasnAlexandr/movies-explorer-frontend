import styles from './MoviesCard.module.css';

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
    <article className={styles.movie}>
      <a href={trailerLink} target='_blank'>
        <img className={styles.movie__image} src={image} alt={name} />
      </a>
      <div className={styles.movie__info}>
        <p className={styles.movie__name}>{name}</p>
        <div className={styles.movie__button}>
          <button
            type='button'
            className={styles.movie__like}
            title='добавить фильм'
          />
        </div>
        <p className={styles.movie__duration}>{timeConverter(duration)}</p>
      </div>
    </article>
  );
};
