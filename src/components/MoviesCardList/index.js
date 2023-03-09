import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard';

export const MoviesCardList = ({ movies = [] }) => (
  <div className='movies'>
    <div className='movies__container'>
      {movies.map(movie => (
        <MoviesCard data={movie} key={movie.id} />
      ))}
    </div>
  </div>
);
