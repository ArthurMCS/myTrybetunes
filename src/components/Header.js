import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default function Header() {
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
    <header data-testid="header-component">
      {isLoading
        ? <Loading />
        : (
          <>
            <p>TrybeTunes</p>
            <nav>
              <Link
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisar
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Músicas Favoritas
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </nav>
            <p data-testid="header-user-name">{user.name}</p>
          </>
        )}
    </header>
  );
}
