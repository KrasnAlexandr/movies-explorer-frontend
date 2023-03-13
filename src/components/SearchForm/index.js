import './SearchForm.css';

export const SearchForm = ({ children }) => {
  const handleSearch = () => {};

  return (
    <form onSubmit={handleSearch} className='search'>
      <div className='search__container'>
        <input
          placeholder='Фильм'
          defaultValue=''
          required
          type='text'
          className='search__input'
        />
        <button className='search__button' type='submit' title='Поиск' />
        <div className='search__filter'>{children}</div>
      </div>
    </form>
  );
};
