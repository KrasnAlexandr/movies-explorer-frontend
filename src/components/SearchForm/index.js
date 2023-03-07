import styles from './SearchForm.module.css';

export const SearchForm = ({ children }) => {
  const handleSearch = () => {};

  return (
    <form onSubmit={handleSearch} className={styles.search} noValidate>
      <div className={styles.search__container}>
        <input
          placeholder='Фильм'
          defaultValue=''
          required
          className={styles.search__input}
        />
        <button className={styles.search__button} type='submit' title='Поиск' />
        <div className={styles.search__filter}>{children}</div>
      </div>
    </form>
  );
};
