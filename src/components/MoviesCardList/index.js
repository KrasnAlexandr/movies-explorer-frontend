import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard';

export const MoviesCardList = ({
  isLoadingError,
  isNothingFound,
  setMovesToShow,
  userMovies,
  movies = []
}) => (
  <div className='movies'>
    <div className='movies__container'>
      {isLoadingError ? (
        <h2 className='movies__title'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </h2>
      ) : isNothingFound ? (
        <h2 className='movies__title'>Ничего не найдено</h2>
      ) : (
        <>
          {movies.map(movie => (
            <MoviesCard
              data={movie}
              userMovies={userMovies}
              setMovesToShow={setMovesToShow}
              key={movie.id || movie._id}
            />
          ))}
        </>
      )}
    </div>
  </div>
);
