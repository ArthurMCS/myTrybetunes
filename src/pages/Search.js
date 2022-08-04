import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const SectionSearch = styled.div`
      margin-top: 100px;
      text-align: center;

      @media (max-width: 1000px) {
          margin-top: 20px;
      }
`;

const SectionMusics = styled.section`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 15px;

      & .musicCard:hover {
        box-shadow: 0px 1px 5px 5px rgba(47, 193, 140, 1);
        cursor: pointer;
      }
`;

const AlbumCard = styled.div`
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 0px 0px 16px;
      gap: 16px;
      width: 290px;
      height: 320px;
      margin: 30px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 
      0px 1px 3px rgba(0, 0, 0, 0.1);

      img {
        height: 180px;
        width: 290px;
        left: calc(50% - 290px/2);
        top: calc(50% - 180px/2 - 70px);
      }

      .link {
        text-align: center;
        font-size: 20px;
        color: #111;
      }

      h4, h5 {
        max-width: 250px;
        word-wrap: break-word;
        color: black;
        font-size: 16px;
        weight: bold;
        margin-left: 15px;
      }

      h5 { font-size: 12px; }
`;

const FormStyled = styled.form`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      Input {
        margin-top: 50px;
        width:500px;
      }

      Button {
        margin-top: 15px;
        width: 500px;
        border: none;
      }


      h3 {
        margin-top: 60px;
        color: #111;
      }

      @media (max-width: 1000px) {
        input {
          width: 200px;
        }

        button {
          width: 200px;
        }

        h3 {
          width: 300px;
          display: block;
          margin-right: auto;
          margin-left: auto;
          word-wrap: break-word;
        }

        .noAlbum {
          text-align: center;
        }
      }
`;

export default function Search() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState('');

  const minLength = 2;

  const handleInputSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await searchAlbumsAPI(search);
    setSearch('');
    setArtists(response);
    setIsLoading(false);
  };

  const renderAlbuns = () => (
    <>
      <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
      <SectionMusics>
        {
          artists.map((artist, index) => (
            <Link
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
              style={ { textDecoration: 'none' } }
              className="link"
              replace
              key={ index }
            >
              <AlbumCard
                className="musicCard"
              >
                <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                <h4>{artist.collectionName}</h4>
                <h5>{artist.artistName}</h5>
              </AlbumCard>
            </Link>
          ))
        }
      </SectionMusics>
    </>
  );

  return (
    <SectionSearch data-testid="page-search">
      {isLoading
        ? <Loading />
        : (
          <FormStyled onSubmit={ handleSubmit }>
            <Input
              type="text"
              data-testid="search-artist-input"
              value={ search }
              onChange={ handleInputSearch }
              placeholder="música ou artista"
            />
            <Button
              disabled={ search.length < minLength }
              type="submit"
              data-testid="search-artist-button"
              onClick={ () => setArtistName(search) }
              color="primary"
            >
              Pesquisar
            </Button>
            {artists.length === 0
              ? <h3 className="noAlbum">Nenhum álbum foi encontrado</h3>
              : renderAlbuns()}
          </FormStyled>)}
      <Footer />
    </SectionSearch>
  );
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
