import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterStyled = styled.div`
        display: none;
         @media (max-width: 1000px) {
             display: flex;
             align-items: center;
             position: fixed;
             bottom: 0;
             justify-content: space-around;
             width: 100%;
             height: 50px;
             background: #036B52;
             border-radius: 8px 8px 0px 0px;

             .link {
                 color: #fff;
             }

             svg {
                 height: 25px;
                 width: 25px;
             }
         }
 `;

export default function Footer() {
  return (
    <FooterStyled>
      <Link
        to="/search"
        style={ { textDecoration: 'none' } }
        className="link"
      >
        <BiSearchAlt />
      </Link>
      <Link
        to="/favorites"
        style={ { textDecoration: 'none' } }
        className="link"
      >
        <BsHeartFill />
      </Link>
      <Link
        to="/profile"
        style={ { textDecoration: 'none' } }
        className="link"
      >
        <CgProfile />
      </Link>
    </FooterStyled>
  );
}
