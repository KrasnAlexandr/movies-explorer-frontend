export const InputWithValidation = ({
  description,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  inputLabelClassName,
  inputDescriptionClassName,
  inputClassName,
  inputErrorClassName,
  inputHelperClassName,
  ...props
}) => {
  return (
    <label className={inputLabelClassName}>
      {description && (
        <span className={inputDescriptionClassName}>{description}</span>
      )}
      <input
        type={type}
        name={name}
        className={`${inputClassName} ${error ? inputErrorClassName : ''}`}
        placeholder={placeholder || ''}
        required
        value={value || ''}
        onChange={onChange}
        {...props}
      />
      <span className={inputHelperClassName}>{error}</span>
    </label>
  );
};
