export const getFilteredMovies = (movies, input) =>
  movies.filter(movie =>
    movie.nameRU.toLowerCase().trim().includes(input.toLowerCase().trim())
  );

export const getOnlyShortMovies = movies =>
  movies.filter(movie => movie.duration <= 40);
