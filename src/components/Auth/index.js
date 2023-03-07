import styles from './Auth.module.css';
import { AuthHeader } from '../AuthHeader';
import { AuthForm } from '../AuthForm';
import { AuthFooter } from '../AuthFooter';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Auth = ({ isSignupPage }) => {
  const location = useLocation();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(values);
  };

  useEffect(() => {
    resetForm();
  }, [location]);

  return (
    <div className={styles.auth}>
      <AuthHeader isSignupPage={isSignupPage} />
      <AuthForm
        handleSubmit={handleSubmit}
        values={values}
        handleChange={handleChange}
        errors={errors}
        isSignupPage={isSignupPage}
      >
        <AuthFooter isSignupPage={isSignupPage} isDisabled={!isValid} />
      </AuthForm>
    </div>
  );
};
