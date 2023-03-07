import { FilterCheckbox } from '../../components/FilterCheckbox';
import { SearchForm } from '../../components/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList';

export const SavedMovies = () => (
  <>
    <SearchForm>
      <FilterCheckbox />
    </SearchForm>
    <MoviesCardList />
  </>
);
