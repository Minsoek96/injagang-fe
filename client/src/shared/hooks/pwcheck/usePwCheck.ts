import { PASSWORD_ERROR_MESSAGE } from '@/src/shared/const';
import { useState, useEffect } from 'react';

interface useCheckProps {
  password: string;
}

const usePwCheck = ({ password }: useCheckProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const checkPassword = () => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (password.length < 10) {
        setIsValid(false);
        setErrorMessage(PASSWORD_ERROR_MESSAGE.LENGTH);
      } else if (!uppercaseRegex.test(password)) {
        setIsValid(false);
        setErrorMessage(PASSWORD_ERROR_MESSAGE.LOWER);
      } else if (!lowercaseRegex.test(password)) {
        setIsValid(false);
        setErrorMessage(PASSWORD_ERROR_MESSAGE.UPPER);
      } else if (!numberRegex.test(password)) {
        setIsValid(false);
        setErrorMessage(PASSWORD_ERROR_MESSAGE.NUMBER);
      } else if (!specialCharRegex.test(password)) {
        setIsValid(false);
        setErrorMessage(PASSWORD_ERROR_MESSAGE.SPECIAL);
      } else {
        setIsValid(true);
        setErrorMessage('');
      }
    };

    checkPassword();
  }, [password]);
  return { isValid, errorMessage };
};

export default usePwCheck;
