import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { InputWithValidation } from '../InputWithValidation';
import { useNavigate } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';
import authApi from '../../utils/Api/AuthApi';
import mainApi from '../../utils/Api/MainApi';

export const ProfileContent = () => {
  const [currentUser, setCurrenUser] = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoUpdated, setIsInfoUpdated] = useState(false);
  const navigate = useNavigate();

  const currentData = currentUser || { name: '', email: '' };

  const informationUpdated = () => {
    setIsInfoUpdated(true);

    setTimeout(() => {
      setIsInfoUpdated(false);
    }, 1500);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    mainApi
      .updateUserInfo({ name: values.name, email: values.email })
      .then(newInfo => {
        setCurrenUser(newInfo);
        informationUpdated();
      })
      .catch(err => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    authApi.signOut();
    setCurrenUser(null);
    navigate(`${PAGE_MANAGER.HOME}`);
    window.location.reload();
  };

  useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm]);

  const isEditButtonDisable = !isValid || isLoading;

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, {currentData.name}!</h2>
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
          {errorMessage && (
            <p className='profile__errors-helper'>{errorMessage}</p>
          )}
          <button
            className={`profile__edit ${
              isEditButtonDisable ? 'profile__edit_type_disabled' : ''
            }`}
            type='submit'
            title='Редактировать'
            disabled={isEditButtonDisable}
          >
            {isInfoUpdated
              ? 'Данные были изменены'
              : isLoading
              ? 'Передача данных...'
              : 'Редактировать'}
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
