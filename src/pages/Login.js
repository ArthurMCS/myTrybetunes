import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const LoginStyled = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15%;
      
      @media (max-width: 800px) {
      
         form {
           width: 350px;
           margin-top: 20%;
         }

      }
`;

const FormStyled = styled.form`
      display: flex;
      background-color: #4B0082;
      height: 300px;
      width: 500px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 5%;

      h1 {
        margin-bottom: 20px;
      }

      Input {
        width: 300px;
      }

      Button {
        margin-top: 20px;
        width: 300px;
      }
`;

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
    <LoginStyled data-testid="page-login">
      {isLoading
        ? <Loading />
        : (
          <FormStyled
            onSubmit={ async (e) => {
              e.preventDefault();
              setIsLoading(true);
              await createUser({ name: userName });
              setIsLoading(false);
              history.push('/search');
            } }
          >
            <h1>TRYBETUNES</h1>
            <Input
              type="text"
              data-testid="login-name-input"
              onChange={ handleInputName }
              value={ userName }
              placeholder="nome"
              maxLength="15"
            />
            <Button
              disabled={ userName.length < minLength }
              type="submit"
              data-testid="login-submit-button"
              color="primary"
            >
              Entrar
            </Button>
          </FormStyled>
        )}
    </LoginStyled>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
