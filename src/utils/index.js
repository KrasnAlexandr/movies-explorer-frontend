import { MIN_IN_HOUR, SHORT_FILM_DURATION } from './constants';

export const getFilteredMovies = (movies, input) =>
  movies.filter(movie =>
    movie.nameRU.toLowerCase().trim().includes(input.toLowerCase().trim())
  );

export const getOnlyShortMovies = movies =>
  movies.filter(movie => movie.duration <= SHORT_FILM_DURATION);

export const timeConverter = time => {
  if (time < MIN_IN_HOUR) {
    return `${time}м`;
  } else {
    const hours = Math.floor(time / MIN_IN_HOUR);
    const minutes = time - hours * MIN_IN_HOUR;

    return minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`;
  }
};
