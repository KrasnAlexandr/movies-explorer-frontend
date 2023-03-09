import './FilterCheckbox.css';

export const FilterCheckbox = ({ value, name }) => {
  const onChange = () => {};

  return (
    <div className='search__checkbox'>
      <label>
        <input
          className='search__checkbox-input'
          type='checkbox'
          onChange={onChange}
          name={name}
          checked={value}
        />
        <span className='search__checkbox-icon' />
      </label>
      <p className='search__checkbox-description'>Короткометражки</p>
    </div>
  );
};
