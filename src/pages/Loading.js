import React, { Component } from 'react';
import styled from 'styled-components';

// https://www.youtube.com/watch?v=zWmaohjrkRw&t=1111s
const LoadingStyled = styled.div`
      width: 50px;
      height: 50px;
      border: 10px solid green;
      border-top-color: transparent;
      border-radius: 50%;
      margin: 0 auto;
      animation: loading 0.6s  linear infinite ;

  
      @keyframes loading { 
        to { 
          transform: rotate(360deg);
        }
      }
`;

export default class Loading extends Component {
  render() {
    return (
      <div>
        <LoadingStyled />
        Carregando...
      </div>
    );
  }
}
