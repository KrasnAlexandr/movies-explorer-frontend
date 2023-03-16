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
    setIsShortMovies(state => !state);
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

        const firstPartMovies = newList.slice(0, cardsToShow);
        const otherMovies = newList.slice(cardsToShow);

        const onlyShortMovies = getOnlyShortMovies(newList);

        const firstPartShortMovies = onlyShortMovies.slice(0, cardsToShow);
        const otherShortMovies = onlyShortMovies.slice(cardsToShow);

        if (newList.length === 0) {
          setIsNothingFound(true);
        } else {
          setMovesToShow(firstPartMovies);
          setOtherMoviesToShown(otherMovies);

          setOnlyShortMovies(firstPartShortMovies);
          setOtherOnlyShortMovies(otherShortMovies);
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
    isShortMovies &&
      moviesToShow.length !== 0 &&
      onlyShortMoviesToShow.length === 0 &&
      setIsNothingFound(true);

    !isShortMovies && moviesToShow.length !== 0 && setIsNothingFound(false);
  }, [isShortMovies, moviesToShow, onlyShortMoviesToShow]);

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
