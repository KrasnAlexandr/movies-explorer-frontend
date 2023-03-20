import { SearchForm } from '../../components/SearchForm';
import { FilterCheckbox } from '../../components/FilterCheckbox';
import { Preloader } from '../../components/Preloader/Preloader';
import { MoviesCardList } from '../../components/MoviesCardList';
import { LoadingButton } from '../../components/LoadingButton';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useEffect, useState } from 'react';
import moviesApi from '../../utils/Api/MoviesApi';
import mainApi from '../../utils/Api/MainApi';
import { getFilteredMovies, getOnlyShortMovies } from '../../utils';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { LOCAL_STORAGE_MAP, MOVIES_PAGE_PARAMS } from '../../utils/constants';

export const Movies = () => {
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
      localStorage.setItem(
        LOCAL_STORAGE_MAP.MOVIES_PAGE.TOGGLE,
        JSON.stringify(!state)
      );
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

          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.INPUT,
            JSON.stringify(values.movie)
          );
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.TOGGLE,
            JSON.stringify(isShortMovies)
          );
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.SAVED_MOVIES,
            JSON.stringify(savedMovies)
          );

          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.FIRST_PART_MOVIES,
            JSON.stringify(firstPartMovies)
          );
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.OTHER_MOVIES,
            JSON.stringify(otherMovies)
          );

          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.FIRST_PART_SHORT_MOVIES,
            JSON.stringify(firstPartShortMovies)
          );
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.OTHER_SHORT_MOVIES,
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

    if (innerWidth >= MOVIES_PAGE_PARAMS.WEB.BREAKPOINT) {
      setCardsToShow(MOVIES_PAGE_PARAMS.WEB.MOVIES_TO_SHOW);
      setCardsToAdd(MOVIES_PAGE_PARAMS.WEB.ADD_BY_N_MOVIES);
    } else if (innerWidth > MOVIES_PAGE_PARAMS.MOBILE.BREAKPOINT) {
      setCardsToShow(MOVIES_PAGE_PARAMS.TABLET.MOVIES_TO_SHOW);
      setCardsToAdd(MOVIES_PAGE_PARAMS.TABLET.ADD_BY_N_MOVIES);
    } else if (innerWidth <= MOVIES_PAGE_PARAMS.MOBILE.BREAKPOINT) {
      setCardsToShow(MOVIES_PAGE_PARAMS.MOBILE.MOVIES_TO_SHOW);
      setCardsToAdd(MOVIES_PAGE_PARAMS.MOBILE.ADD_BY_N_MOVIES);
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
    const inputValue = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.INPUT
    );
    const toggle = localStorage.getItem(LOCAL_STORAGE_MAP.MOVIES_PAGE.TOGGLE);
    const savedMovies = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.SAVED_MOVIES
    );

    const firstPartMovies = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.FIRST_PART_MOVIES
    );
    const otherMovies = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.OTHER_MOVIES
    );

    const firstPartShortMovies = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.FIRST_PART_SHORT_MOVIES
    );
    const otherShortMovies = localStorage.getItem(
      LOCAL_STORAGE_MAP.MOVIES_PAGE.OTHER_SHORT_MOVIES
    );

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
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
};
