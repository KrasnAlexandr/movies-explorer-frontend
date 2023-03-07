import styles from './LoadingButton.module.css';

export const LoadingButton = ({ onClick }) => {
  return (
    <button type='button' className={styles.button} onClick={onClick}>
      Ещё
    </button>
  );
};
