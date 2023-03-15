import { FilterCheckbox } from '../../components/FilterCheckbox';
import { SearchForm } from '../../components/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useState } from 'react';

export const SavedMovies = () => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isNothingFound, setIsNothingFound] = useState(false);

  const [moviesToShow, setMovesToShow] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [onlyShortMoviesToShow, setOnlyShortMovies] = useState([]);

  const handleChangeCheckBoxState = () => {
    setIsShortMovies(state => !state);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(values);
  };

  return (
    <>
      <SearchForm
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      >
        <FilterCheckbox
          checkBoxState={isShortMovies}
          handleChange={handleChangeCheckBoxState}
        />
      </SearchForm>
      <MoviesCardList
        movies={isShortMovies ? onlyShortMoviesToShow : moviesToShow}
        isNothingFound={isNothingFound}
      />
    </>
  );
};
