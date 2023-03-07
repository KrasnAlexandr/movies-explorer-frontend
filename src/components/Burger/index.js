import styles from './Burger.module.css';

export const Burger = ({ isMenuOpen, onClick }) => {
  return (
    <button
      type='button'
      className={`${styles.header__burger} ${
        isMenuOpen ? styles.header__burger_type_active : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`${styles.header__line} ${
          isMenuOpen ? styles.header__line_type_hidden : ''
        }`}
      />
    </button>
  );
};
