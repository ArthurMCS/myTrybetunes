import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// https://www.youtube.com/watch?v=zWmaohjrkRw&t=1111s
const LoadingStyled = styled.div`
      width: 80px;
      height: 80px;
      border: 15px solid #4B0082;
      border-top-color: transparent;
      border-radius: 50%;
      animation: loading 0.6s  linear infinite ;
      margin-top: 50px;
  
      @keyframes loading { 
        to { 
          transform: rotate(360deg);
        }
      }
`;

const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      
      .isMusicCard {
        width: 30px;
        height: 30px;
        border: 8px solid #4B0082;
        border-top-color: transparent;
        border-radius: 50%;
        margin-left: 450px;
        margin-top: 15px;

        @media (max-width: 800px) {
           margin-left: 375px;
           margin-top: 15px;
        }

      }

      p {
        color: #111;
      }
`;

export default function Loading({ isMusicCard }) {
  return (
    <Container>
      <LoadingStyled className={ isMusicCard && 'isMusicCard' } />
      {/* <p>Carregando...</p> */}
    </Container>
  );
}

Loading.propTypes = {
  isMusicCard: PropTypes.bool.isRequired,
}.isRequired;
