import './Profile.css';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { InputWithValidation } from '../InputWithValidation';
import { useNavigate } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const ProfileContent = () => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const navigate = useNavigate();

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(values);
  };

  const handleSignOut = () => {
    //удаление токена
    navigate(`${PAGE_MANAGER.HOME}`);
  };

  useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm]);

  return (
    <div className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
      <form
        name='profile'
        className='profile__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='profile__row'>
          <p className='profile__description'>Имя</p>
          <InputWithValidation
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
            inputClassName='profile__input'
            inputLabelClassName='profile__label'
            inputErrorClassName='profile__input_type_error'
            inputHelperClassName='profile__input-helper'
          />
        </div>
        <div className='profile__row'>
          <p className='profile__description'>E-mail</p>
          <InputWithValidation
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
            inputClassName='profile__input'
            inputLabelClassName='profile__label'
            inputErrorClassName='profile__input_type_error'
            inputHelperClassName='profile__input-helper'
          />
        </div>

        <div className='profile__buttons'>
          <button className='profile__edit' type='submit' title='Редактировать'>
            Редактировать
          </button>
          <button
            type='button'
            title='Выйти из аккаунта'
            className='profile__signout'
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </div>
  );
};
