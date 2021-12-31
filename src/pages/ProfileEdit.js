/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

const FormStyled = styled.form`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      Input {
        width: 400px;
        margin-bottom: 30px;
      }

      label {
        font-size: 25px;
        margin-top: 20px;
        color: #fff;
        margin-left: 10px;
        margin-bottom: 5px;;
      }

      Button {
        border: none;
        background-color: #7B68EE;
        margin-top: 70px;
        margin-bottom: 40px;
        width: 400px;
      }

      Button:hover {
        border: none;
        background-color: #4B0082;
      }

      .description { 
        width: 400px;
        height: 100px;
      }

`;

export default function ProfileEdit({ history }) {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserImg, setNewUserImg] = useState('');
  const [newUserDescription, setNewUserDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      name: newUserName,
      email: newUserEmail,
      image: newUserImg,
      description: newUserDescription,
    };
    await updateUser(newUser);
    setIsLoading(false);
    history.push('/profile');
  };

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await getUser();
    setNewUserName(response.name);
    setNewUserEmail(response.email);
    setNewUserImg(response.image);
    setNewUserDescription(response.description);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => () => {
    setIsLoading(false);
  }, []);

  return (
    <div data-testid="page-profile-edit">
      {isLoading ? <Loading /> : (
        <FormStyled onSubmit={ handleSubmit }>
          <label htmlFor="input-name">
            Nome
          </label>
          <Input
            type="text"
            value={ newUserName }
            onChange={ ({ target }) => setNewUserName(target.value) }
            data-testid="edit-input-name"
            id="input-name"
            maxLength="15"
          />
          <label htmlFor="input-email">
            Email
          </label>
          <Input
            type="email"
            value={ newUserEmail }
            onChange={ ({ target }) => setNewUserEmail(target.value) }
            data-testid="edit-input-email"
            id="input-email"
          />
          <label htmlFor="input-image">
            URL da imagem
          </label>
          <Input
            type="text"
            value={ newUserImg }
            onChange={ ({ target }) => setNewUserImg(target.value) }
            data-testid="edit-input-image"
            id="input-image"
          />
          <label htmlFor="input-description">
            Descrição
          </label>
          <Input
            className="description"
            type="textarea"
            value={ newUserDescription }
            onChange={ ({ target }) => setNewUserDescription(target.value) }
            data-testid="edit-input-description"
            id="input-description"
          />
          <Button
            type="submit"
            data-testid="edit-button-save"
            disabled={
              newUserName.length === 0
              || !newUserEmail.includes('@')
              || !newUserEmail.includes('.com')
              || newUserImg.length === 0
              || newUserDescription.length === 0
            }
          >
            Salvar
          </Button>
        </FormStyled>
      )}
    </div>
  );
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
