import styles from './InputForAuth.module.css';

export const InputWithValidation = ({
  description,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  inputClassName,
  ...props
}) => {
  const calculateInputClassName = `${styles.input} ${
    inputClassName ? inputClassName : ''
  } ${error ? styles.input_type_error : ''}`;

  return (
    <label className={styles.input__label}>
      {description && (
        <p className={styles.input__description}>{description}</p>
      )}
      <input
        type={type}
        name={name}
        className={calculateInputClassName}
        placeholder={placeholder || ''}
        required
        value={value || ''}
        onChange={onChange}
        {...props}
      />
      <span className={`${styles.input__error} ${error ? '' : ''}`}>
        {error}
      </span>
    </label>
  );
};
