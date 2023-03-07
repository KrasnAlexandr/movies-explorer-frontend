import styles from './FilterCheckbox.module.css';

export const FilterCheckbox = ({ value, name }) => {
  const onChange = () => {};

  return (
    <div className={styles.filter__container}>
      <label>
        <input
          className={styles.filter__input}
          type='checkbox'
          onChange={onChange}
          name={name}
          checked={value}
        />
        <div className={styles.filter__icon} />
      </label>
      <p className={styles.filter__description}>Короткометражки</p>
    </div>
  );
};
