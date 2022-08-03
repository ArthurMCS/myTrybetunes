import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import imgDefault from '../images/img.png';
import logoPng from '../images/smallLogo.png';

const TrybeLogo = styled.div`
      position: absolute;
      width: 117px;
      height: 96px;
      left: 50px;
      top: -8px;
      background: url(${logoPng});

            
      @media (max-width: 1000px) {
          display: none;
      }
`;

const HeaderStyled = styled.header`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: #023031;
      box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);

      div {
        height: 100px;
      }

      nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        background: #F0F2F5;
        width: 100%;
        height: 80px;
        top: 100px;

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 33%;
            height: 100%;

            font-style: normal;
            font-weight: 700;
            font-size: 28px;
            line-height: 29px;
            color: rgba(47, 193, 140, 1);

            &:hover {
              background: #036B52;
              color: rgba(255, 255, 255, 1);
            }
          }

      }

      .user-container {
        position: absolute;
        width: 250px;
        height: 41.65px;
        right: 50px;
        top: 31px;

        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 50px;

        span {
          position: absolute;
          top: 8px;
          left: 58px;
          text-align: center;
          font-size: 18px;
        }

        img {
          height: 40px;
          width: 40px;
          border-radius: 100%;
        }
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

  useEffect(() => () => {
    setUser('');
    setIsLoading(false);
    setImage('');
  }, []);

  return (
    <HeaderStyled data-testid="header-component">
      <div>
        <TrybeLogo />
        <div className="user-container">
          {
            isLoading
              ? <Loading isHeader />
              : (
                <div>
                  <img
                    src={
                      image === ''
                        ? imgDefault
                        : image
                    }
                    alt="profile"
                  />
                  <span data-testid="header-user-name">{user.name}</span>
                </div>
              )
          }
        </div>
      </div>
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
    </HeaderStyled>
  );
}
