import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

const HeaderStyled = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #036b52;
      height: 70px;

      h2 {
        margin-top: 10px;
        font-size: 30px; 
      }

      .link {
        color: black;
        font-size: 30px;
        margin-right: 20px;
        transition: all 0.6s ease;
      }

      .link:hover {
        color: #fff;
      }
`;

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
          <HeaderStyled>
            <h2>TrybeTunes</h2>
            <nav>
              <Link
                data-testid="link-to-search"
                to="/search"
                style={ { textDecoration: 'none' } }
                className="link"
              >
                Pesquisar
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                style={ { textDecoration: 'none' } }
                className="link"
              >
                Músicas Favoritas
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                style={ { textDecoration: 'none' } }
                className="link"
              >
                Perfil
              </Link>
            </nav>
            <h2 data-testid="header-user-name">{user.name}</h2>
          </HeaderStyled>
        )}
    </header>
  );
}
