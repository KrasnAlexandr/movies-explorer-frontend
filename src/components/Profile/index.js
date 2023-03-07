import styles from './Profile.module.css';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { InputWithValidation } from '../InputWithValidation';
import { useNavigate } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const Account = () => {
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
    <div className={styles.account}>
      <h2
        className={styles.account__title}
      >{`Привет, ${currentUser.name}!`}</h2>
      <form
        name='profile'
        className={styles.account__form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.account__row}>
          <p className={styles.account__description}>Имя</p>
          <InputWithValidation
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            inputClassName={styles.account__input}
          />
        </div>
        <div className={styles.account__row}>
          <p className={styles.account__description}>E-mail</p>
          <InputWithValidation
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            inputClassName={styles.account__input}
          />
        </div>

        <div className={styles.account__buttons}>
          <button
            className={styles.account__edit}
            type='submit'
            title='Редактировать'
          >
            Редактировать
          </button>
          <button
            type='button'
            title='Выйти из аккаунта'
            className={styles.account__signout}
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </div>
  );
};
