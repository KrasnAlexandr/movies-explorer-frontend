import styles from './AuthForm.module.css';
import { InputWithValidation } from '../InputWithValidation';
import { useLocation } from 'react-router-dom';

export const AuthForm = ({
  handleSubmit,
  values,
  handleChange,
  errors,
  isSignupPage = false,
  children
}) => {
  const location = useLocation();

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.auth__from}
      name={location || ''}
    >
      {isSignupPage && (
        <InputWithValidation
          description='Имя'
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
      )}

      <InputWithValidation
        description='E-mail'
        type='email'
        name='email'
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputWithValidation
        description='Пароль'
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        minLength='8'
      />
      {children}
    </form>
  );
};
