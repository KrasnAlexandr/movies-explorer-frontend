import styles from './MoviesCardList.module.css';
import { MoviesCard } from '../MoviesCard';

export const MoviesCardList = ({ movies = [] }) => (
  <section className={styles.movies}>
    <div className={styles.movies__container}>
      {movies.map(movie => (
        <MoviesCard data={movie} key={movie.id} />
      ))}
    </div>
  </section>
);
