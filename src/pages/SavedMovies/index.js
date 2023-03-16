import { FilterCheckbox } from '../../components/FilterCheckbox';
import { SearchForm } from '../../components/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useEffect, useMemo, useState } from 'react';
import mainApi from '../../utils/Api/MainApi';
import { getFilteredMovies, getOnlyShortMovies } from '../../utils';

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

  const currentList = useMemo(() => {
    if (!isFilter) {
      if (isShortMovies) {
        return onlyShortMoviesToShow;
      } else {
        return moviesToShow;
      }
    } else {
      if (isShortMovies) {
        return filteredShortMoviesToShow;
      } else {
        return filteredMovie;
      }
    }
  }, [
    isFilter,
    isShortMovies,
    onlyShortMoviesToShow,
    moviesToShow,
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
      setIsNothingFound(false);
      setIsFilter(true);
    }

    const filteredAllMovies = getFilteredMovies(moviesToShow, values.movie);

    setFilteredMovie(filteredAllMovies);
    setFilteredOnlyShortMovies(getOnlyShortMovies(filteredAllMovies));
  };

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then(savedMovies => {
        setMovesToShow(savedMovies);
        setOnlyShortMovies(getOnlyShortMovies(savedMovies));
      })
      .catch(err => console.error(err.message));
  }, []);

  useEffect(() => {
    setOnlyShortMovies(getOnlyShortMovies(moviesToShow));

    if (isFilter) {
      const filteredAllMovies = getFilteredMovies(moviesToShow, values.movie);

      setFilteredMovie(filteredAllMovies);
      setFilteredOnlyShortMovies(getOnlyShortMovies(filteredAllMovies));
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
