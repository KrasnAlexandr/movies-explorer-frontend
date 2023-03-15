import './AuthForm.css';
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
  const location = useLocation().pathname;

  return (
    <form
      onSubmit={handleSubmit}
      className='auth__form'
      name={location.slice(1) || ''}
      noValidate
    >
      <div className='auth__form-container'>
        {isSignupPage && (
          <InputWithValidation
            description='Имя'
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
            minLength={2}
            maxLength={30}
            inputLabelClassName='auth__label'
            inputClassName='auth__input'
            inputDescriptionClassName='auth__input-description'
            inputErrorClassName='auth__input_type_error'
            inputHelperClassName='auth__input-helper'
          />
        )}

        <InputWithValidation
          description='E-mail'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
          inputLabelClassName='auth__label'
          inputClassName='auth__input'
          inputDescriptionClassName='auth__input-description'
          inputErrorClassName='auth__input_type_error'
          inputHelperClassName='auth__input-helper'
        />

        <InputWithValidation
          description='Пароль'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          minLength='8'
          required
          inputLabelClassName='auth__label'
          inputClassName='auth__input'
          inputDescriptionClassName='auth__input-description'
          inputErrorClassName='auth__input_type_error'
          inputHelperClassName='auth__input-helper'
        />
      </div>
      {children}
    </form>
  );
};
