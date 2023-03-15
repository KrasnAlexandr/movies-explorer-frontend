import './SearchForm.css';
import { useLocation } from 'react-router-dom';

export const SearchForm = ({
  handleSubmit,
  values,
  handleChange,
  children,
  error
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
        <button className='search__button' type='submit' title='Поиск' />
        <div className='search__filter'>{children}</div>
      </div>
    </form>
  );
};
