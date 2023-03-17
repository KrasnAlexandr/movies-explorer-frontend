import { SearchForm } from '../../components/SearchForm';
import { FilterCheckbox } from '../../components/FilterCheckbox';
import { Preloader } from '../../components/Preloader/Preloader';
import { MoviesCardList } from '../../components/MoviesCardList';
import { LoadingButton } from '../../components/LoadingButton';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useContext, useEffect, useState } from 'react';
import moviesApi from '../../utils/Api/MoviesApi';
import mainApi from '../../utils/Api/MainApi';
import { getFilteredMovies, getOnlyShortMovies } from '../../utils';
import { PAGE_MANAGER } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export const Movies = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrenUser] = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [inputError, setInputError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const [userMovies, setUserMovies] = useState([]);

  const [moviesToShow, setMovesToShow] = useState([]);
  const [otherMoviesToShown, setOtherMoviesToShown] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [onlyShortMoviesToShow, setOnlyShortMovies] = useState([]);
  const [otherOnlyShortMoviesToShow, setOtherOnlyShortMovies] = useState([]);

  const [cardsToShow, setCardsToShow] = useState(0);
  const [cardsToAdd, setCardsToAdd] = useState(0);

  const handleChangeCheckBoxState = () => {
    setIsShortMovies(state => {
      localStorage.setItem('toggle', JSON.stringify(!state));
      return !state;
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!isValid) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
      setMovesToShow([]);
      setOtherMoviesToShown([]);
      setOnlyShortMovies([]);
      setOtherOnlyShortMovies([]);
      setIsLoading(true);
      setIsLoadingError(false);
      setIsNothingFound(false);
    }

    Promise.all([mainApi.getSavedMovies(), moviesApi.getMovies()])
      .then(allData => {
        const [savedMovies, allMovies] = allData;

        setUserMovies(savedMovies);

        const newList = getFilteredMovies(allMovies, values.movie);

        if (newList.length === 0) {
          setIsNothingFound(true);
        } else {
          const firstPartMovies = newList.slice(0, cardsToShow);
          const otherMovies = newList.slice(cardsToShow);

          const onlyShortMovies = getOnlyShortMovies(newList);

          const firstPartShortMovies = onlyShortMovies.slice(0, cardsToShow);
          const otherShortMovies = onlyShortMovies.slice(cardsToShow);

          setMovesToShow(firstPartMovies);
          setOtherMoviesToShown(otherMovies);

          setOnlyShortMovies(firstPartShortMovies);
          setOtherOnlyShortMovies(otherShortMovies);

          localStorage.setItem('input', JSON.stringify(values.movie));
          localStorage.setItem('toggle', JSON.stringify(isShortMovies));
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

          localStorage.setItem(
            'firstPartMovies',
            JSON.stringify(firstPartMovies)
          );
          localStorage.setItem('otherMovies', JSON.stringify(otherMovies));

          localStorage.setItem(
            'firstPartShortMovies',
            JSON.stringify(firstPartShortMovies)
          );
          localStorage.setItem(
            'otherShortMovies',
            JSON.stringify(otherShortMovies)
          );
        }
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  };

  const handleAddFilmToShow = () => {
    if (isShortMovies) {
      const newListShortMoviesToShow = [
        ...onlyShortMoviesToShow,
        ...otherOnlyShortMoviesToShow.slice(0, cardsToAdd)
      ];

      setOnlyShortMovies(newListShortMoviesToShow);
      setOtherOnlyShortMovies(otherOnlyShortMoviesToShow.slice(cardsToAdd));
    } else {
      const newListMoviesToShow = [
        ...moviesToShow,
        ...otherMoviesToShown.slice(0, cardsToAdd)
      ];

      setMovesToShow(newListMoviesToShow);
      setOtherMoviesToShown(otherMoviesToShown.slice(cardsToAdd));
    }
  };

  const getCurrentCurrentForCardsRender = () => {
    const innerWidth = window.innerWidth;

    if (innerWidth >= 1280) {
      setCardsToShow(12);
      setCardsToAdd(4);
    } else if (innerWidth >= 481) {
      setCardsToShow(8);
      setCardsToAdd(2);
    } else if (innerWidth <= 480) {
      setCardsToShow(5);
      setCardsToAdd(1);
    }
  };

  useEffect(() => {
    getCurrentCurrentForCardsRender();

    window.addEventListener('resize', getCurrentCurrentForCardsRender);

    return () =>
      window.removeEventListener('resize', getCurrentCurrentForCardsRender);
  }, []);

  useEffect(() => {
    if (isShortMovies) {
      moviesToShow.length !== 0 &&
        onlyShortMoviesToShow.length === 0 &&
        setIsNothingFound(true);
    } else {
      moviesToShow.length !== 0 && setIsNothingFound(false);
    }
  }, [isShortMovies, moviesToShow, onlyShortMoviesToShow]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt).then(userInfo => setCurrenUser(userInfo));
    } else {
      navigate(PAGE_MANAGER.HOME);
    }

    const inputValue = localStorage.getItem('input');
    const toggle = localStorage.getItem('toggle');
    const savedMovies = localStorage.getItem('savedMovies');

    const firstPartMovies = localStorage.getItem('firstPartMovies');
    const otherMovies = localStorage.getItem('otherMovies');

    const firstPartShortMovies = localStorage.getItem('firstPartShortMovies');
    const otherShortMovies = localStorage.getItem('otherShortMovies');

    inputValue && resetForm({ movie: JSON.parse(inputValue) });
    toggle && setIsShortMovies(JSON.parse(toggle));
    savedMovies && setUserMovies(JSON.parse(savedMovies));

    firstPartMovies && setMovesToShow(JSON.parse(firstPartMovies));
    otherMovies && setOtherMoviesToShown(JSON.parse(otherMovies));

    firstPartShortMovies &&
      setOnlyShortMovies(JSON.parse(firstPartShortMovies));
    otherShortMovies && setOtherOnlyShortMovies(JSON.parse(otherShortMovies));
  }, []);

  return (
    <>
      <SearchForm
        values={values}
        error={inputError}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      >
        <FilterCheckbox
          checkBoxState={isShortMovies}
          handleChange={handleChangeCheckBoxState}
        />
      </SearchForm>

      {isLoading && <Preloader />}

      <MoviesCardList
        movies={isShortMovies ? onlyShortMoviesToShow : moviesToShow}
        isLoadingError={isLoadingError}
        isNothingFound={isNothingFound}
        userMovies={userMovies}
        setMovesToShow={setUserMovies}
      />

      {isShortMovies && otherOnlyShortMoviesToShow.length === 0 ? (
        <></>
      ) : otherMoviesToShown.length === 0 ? (
        <></>
      ) : (
        <LoadingButton onClick={handleAddFilmToShow} />
      )}
    </>
  );
};
