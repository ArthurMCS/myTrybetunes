import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

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
        <form onSubmit={ handleSubmit }>
          <input
            type="text"
            value={ newUserName }
            onChange={ ({ target }) => setNewUserName(target.value) }
            data-testid="edit-input-name"
          />
          <input
            type="email"
            value={ newUserEmail }
            onChange={ ({ target }) => setNewUserEmail(target.value) }
            data-testid="edit-input-email"
          />
          <input
            type="text"
            value={ newUserImg }
            onChange={ ({ target }) => setNewUserImg(target.value) }
            data-testid="edit-input-image"
          />
          <textarea
            value={ newUserDescription }
            onChange={ ({ target }) => setNewUserDescription(target.value) }
            data-testid="edit-input-description"
          />
          <button
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
          </button>
        </form>
      )}
    </div>
  );
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
