import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logoPng from '../images/LOGO_POSITIVA.png';

const TrybeLogo = styled.div`
      position: absolute;
      width: 208px;
      height: 158px;
      top: 150px;
      background: url(${logoPng});

            
      @media (max-width: 1000px) {
           top: 50px;
      }
`;

const LoginStyled = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      
      @media (max-width: 1000px) {
         form {
           height: 200px;
           width: 300px;
         }

      }
`;

const FormStyled = styled.form`
      display: flex;
      position: absolute;
      background: #FFFFFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      width: 697px;
      height: 314px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      top: 353px;

      h1 {
        margin-bottom: 20px;
      }

      Input {
        width: 500px;
      }

      Button {
        margin-top: 20px;
        width: 500px;
      }

      @media (max-width: 1000px) {

        top: 300px;

        input {
          width: 200px;
        }

        button {
          width: 200px;
        }
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
          <>
            <TrybeLogo />
            <FormStyled
              onSubmit={ async (e) => {
                e.preventDefault();
                setIsLoading(true);
                await createUser({ name: userName });
                setIsLoading(false);
                history.push('/search');
              } }
            >
              <Input
                type="text"
                data-testid="login-name-input"
                onChange={ handleInputName }
                value={ userName }
                placeholder="Nome"
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
          </>
        )}
    </LoginStyled>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
