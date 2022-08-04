import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// https://www.youtube.com/watch?v=zWmaohjrkRw&t=1111s
const LoadingStyled = styled.div`
      width: 80px;
      height: 80px;
      border: 15px solid #036B52;
      border-top-color: transparent;
      border-radius: 50%;
      animation: loading 0.6s  linear infinite;
      margin-top: 300px;
  
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
        border: 8px solid #fc466b;
        border-top-color: transparent;
        border-radius: 50%;
        margin-left: 400px;
        margin-top: 10px;

        @media (max-width: 1000px) {
           margin-left: 0px;
           margin-top: 120px;
        }

      }

`;

export default function Loading({ isMusicCard, isHeader }) {
  return (
    <Container>
      <LoadingStyled
        className={ isMusicCard && 'isMusicCard' }
        id={ isHeader && 'isHeader' }
      />
    </Container>
  );
}

Loading.propTypes = {
  isMusicCard: PropTypes.bool.isRequired,
}.isRequired;
