import { SearchForm } from '../../components/SearchForm';
import { FilterCheckbox } from '../../components/FilterCheckbox';
import { Preloader } from '../../components/Preloader/Preloader';
import { MoviesCardList } from '../../components/MoviesCardList';
import { testMovies } from '../../components/MoviesCardList/movies_array';
import { LoadingButton } from '../../components/LoadingButton';

export const Movies = () => (
  <>
    <SearchForm>
      <FilterCheckbox />
    </SearchForm>
    <Preloader />
    <MoviesCardList movies={testMovies} />
    <LoadingButton onClick={() => {}} />
  </>
);
