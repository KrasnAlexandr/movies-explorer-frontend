import './LoadingButton.css';

export const LoadingButton = ({ onClick }) => {
  return (
    <button type='button' className='loading-button' onClick={onClick}>
      Ещё
    </button>
  );
};
