import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default function Login({ history }) {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const minLength = 3;

  const handleInputName = ({ target }) => {
    setUserName(target.value);
  };

  useEffect(() => () => {
    setIsLoading(false);
  }, []);

  return (
    <div data-testid="page-login">
      {isLoading
        ? <Loading />
        : (
          <>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ handleInputName }
              value={ userName }
            />
            <button
              disabled={ userName.length < minLength }
              type="submit"
              data-testid="login-submit-button"
              onClick={ async () => {
                setIsLoading(true);
                await createUser({ name: userName });
                setIsLoading(false);
                history.push('/search');
              } }
            >
              Entrar
            </button>
          </>
        )}
    </div>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
