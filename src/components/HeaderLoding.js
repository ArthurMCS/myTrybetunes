import React from 'react';
import styled from 'styled-components';

const Loading = styled.span`
      position: absolute;  
      color: #fff;
      font-size: 22px;
      right: 115px;
      top: 30px;
      text-align: center;

      @media (max-width: 1000px) {
          display: none;
      }
`;

export default function HeaderLoding() {
  return (
    <Loading>Carregando...</Loading>
  );
}
