import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default function Profile() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await getUser();
    setUser(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div data-testid="page-profile">
      {
        isLoading
          ? <Loading />
          : (
            <>
              <p>
                {user.name}
              </p>
              <p>
                {user.email}
              </p>
              <p>
                {user.description}
              </p>
              <Link to="/profile/edit">Editar perfil</Link>
              <img src={ user.image } alt="user" data-testid="profile-image" />
            </>
          )
      }
    </div>
  );
}
