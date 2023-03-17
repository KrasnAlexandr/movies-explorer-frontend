import { FilterCheckbox } from '../../components/FilterCheckbox';
import { SearchForm } from '../../components/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useContext, useEffect, useMemo, useState } from 'react';
import mainApi from '../../utils/Api/MainApi';
import { getFilteredMovies, getOnlyShortMovies } from '../../utils';
import { PAGE_MANAGER } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export const SavedMovies = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrenUser] = useContext(CurrentUserContext);

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

  const updateCurrentList = () => {
    const filteredAllMovies = getFilteredMovies(moviesToShow, values.movie);

    setFilteredMovie(filteredAllMovies);
    setFilteredOnlyShortMovies(getOnlyShortMovies(filteredAllMovies));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!isValid) {
      setInputError(true);
    } else {
      setInputError(false);
      setIsNothingFound(false);
      setIsFilter(true);
      updateCurrentList();
    }
  };

  const handleResetFilter = () => {
    resetForm({});
    setIsNothingFound(false);
    setIsFilter(false);
    setFilteredMovie([]);
    setFilteredOnlyShortMovies([]);
  };

  useEffect(() => {
    setOnlyShortMovies(getOnlyShortMovies(moviesToShow));

    if (isFilter) {
      updateCurrentList();
    }
  }, [moviesToShow]);

  useEffect(() => {
    if (isFilter) {
      if (isShortMovies) {
        currentList.length === 0 && setIsNothingFound(true);
      } else {
        (currentList.length === 0 && setIsNothingFound(true)) ||
          (filteredMovie.length !== 0 && setIsNothingFound(false));
      }
    }
  }, [isFilter, currentList]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt).then(userInfo => setCurrenUser(userInfo));
    } else {
      navigate(PAGE_MANAGER.HOME);
    }

    mainApi
      .getSavedMovies()
      .then(savedMovies => {
        setMovesToShow(savedMovies.reverse());
        setOnlyShortMovies(getOnlyShortMovies(savedMovies));
      })
      .catch(err => console.error(err.message));
  }, []);

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
