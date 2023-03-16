import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const SearchForm = ({
  handleSubmit,
  values,
  handleChange,
  children,
  error,
  resetForm
}) => {
  const currentPage = useLocation().pathname;

  return (
    <form
      onSubmit={handleSubmit}
      className='search'
      name={currentPage.slice(1)}
      noValidate
    >
      <div className='search__container'>
        <input
          placeholder='Фильм'
          name='movie'
          value={values.movie || ''}
          onChange={handleChange}
          required
          type='text'
          className='search__input'
          minLength={1}
        />
        <span
          className={`search__input-helper ${
            error ? 'search__input-helper_type_visible' : ''
          }`}
        >
          Нужно ввести ключевое слово
        </span>
        {currentPage === PAGE_MANAGER.SAVED_MOVIES && (
          <button
            className='search__reset-button'
            type='button'
            title='Сбросить фильтр'
            onClick={resetForm}
          />
        )}
        <button className='search__button' type='submit' title='Поиск' />
        <div className='search__filter'>{children}</div>
      </div>
    </form>
  );
};
