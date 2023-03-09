import './Burger.css';

export const Burger = ({ isMenuOpen, onClick }) => {
  return (
    <button
      type='button'
      className={`header__burger ${
        isMenuOpen ? 'header__burger_type_active' : ''
      }`}
      onClick={onClick}
    >
      <span
        className={`header__line ${
          isMenuOpen ? 'header__line_type_hidden' : ''
        }`}
      />
    </button>
  );
};
