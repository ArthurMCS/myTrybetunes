import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import imgDefault from '../images/img.png';

const HeaderStyled = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: rgb(63,94,251);
      background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
      height: 100px;

      h2 {
        font-size: 50px; 
        color: black;
      }

      h3 {
        margin-top: 10px;
        color: black;
      }

      nav {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .link {
        color: black;
        font-size: 35px;
        margin-right: 20px;
        margin-left: 20px;
        transition: all 0.6s ease;
      }


      div {
       display: flex;
       align-items: center;
       justify-content: center;
       width: 300px;
      }

      img {
        border: 1px solid black;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        margin-right: 15px;
        margin-top: 5px;;
      }

      .link:hover {
        color: #fff;
      }
`;

export default function Header() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await getUser();
    setUser(response);
    setImage(response.image);
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
            <div>
              <img
                src={
                  image === ''
                    ? imgDefault
                    : image
                }
                alt="profile"
              />
              <h3 data-testid="header-user-name">{user.name}</h3>
            </div>
          </HeaderStyled>
        )}
    </header>
  );
}
