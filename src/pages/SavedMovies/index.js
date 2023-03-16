import { FilterCheckbox } from '../../components/FilterCheckbox';
import { SearchForm } from '../../components/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useEffect, useMemo, useState } from 'react';
import mainApi from '../../utils/Api/MainApi';

export const SavedMovies = () => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [inputError, setInputError] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [moviesToShow, setMovesToShow] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [onlyShortMoviesToShow, setOnlyShortMovies] = useState([]);
  const [filteredShortMoviesToShow, setFilteredOnlyShortMovies] = useState([]);

  const handleChangeCheckBoxState = () => {
    setIsShortMovies(state => !state);
  };

  const filteredMovies = movies =>
    movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(values.movie.toLowerCase().trim())
    );
  const filteredOnlyShortMovies = movies =>
    movies.filter(movie => movie.duration <= 40);

  const currentList = useMemo(() => {
    if (isShortMovies && !isFilter) {
      return onlyShortMoviesToShow;
    }
    if (!isShortMovies && !isFilter) {
      return moviesToShow;
    }
    if (isShortMovies && isFilter) {
      return filteredShortMoviesToShow;
    }
    if (!isShortMovies && isFilter) {
      return filteredMovie;
    }
  }, [
    moviesToShow,
    onlyShortMoviesToShow,
    isShortMovies,
    isFilter,
    filteredMovie,
    filteredShortMoviesToShow
  ]);

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!isValid) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }
    setIsNothingFound(false);
    setIsFilter(true);

    const filteredAllMovies = filteredMovies(moviesToShow);

    setFilteredMovie(filteredAllMovies);
    setFilteredOnlyShortMovies(filteredOnlyShortMovies(filteredAllMovies));
  };

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then(savedMovies => {
        setMovesToShow(savedMovies);
        setOnlyShortMovies(filteredOnlyShortMovies(savedMovies));
      })
      .catch(err => console.error(err.message));
  }, []);

  useEffect(() => {
    setOnlyShortMovies(filteredOnlyShortMovies(moviesToShow));

    if (isFilter) {
      const filteredAllMovies = filteredMovies(moviesToShow);

      setFilteredMovie(filteredAllMovies);
      setFilteredOnlyShortMovies(filteredOnlyShortMovies(filteredAllMovies));
    }
  }, [moviesToShow]);

  const handleResetFilter = () => {
    resetForm({});
    setIsNothingFound(false);
    setIsFilter(false);
    setFilteredMovie([]);
    setFilteredOnlyShortMovies([]);
  };

  return (
    <>
      <SearchForm
        values={values}
        error={inputError}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        resetForm={handleResetFilter}
      >
        <FilterCheckbox
          checkBoxState={isShortMovies}
          handleChange={handleChangeCheckBoxState}
        />
      </SearchForm>
      <MoviesCardList
        movies={currentList}
        isNothingFound={isNothingFound}
        setMovesToShow={setMovesToShow}
      />
    </>
  );
};
