import './FilterCheckbox.css';

export const FilterCheckbox = ({ checkBoxState, handleChange }) => {
  return (
    <div className='search__checkbox'>
      <label>
        <input
          className='search__checkbox-input'
          type='checkbox'
          onChange={handleChange}
          name='checkbox'
          checked={checkBoxState}
        />
        <span className='search__checkbox-icon' />
      </label>
      <p className='search__checkbox-description'>Короткометражки</p>
    </div>
  );
};
