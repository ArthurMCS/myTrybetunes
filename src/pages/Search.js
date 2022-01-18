import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const SectionMusics = styled.section`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      & .musicCard:hover {
        box-shadow: 0px 1px 5px 5px #7B68EE;
        cursor: pointer;
      }
`;

const AlbumCard = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 300px;
      width: 300px;
      background: rgb(63,94,251);
      background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
      margin: 30px;
      border-radius: 20%;
      overflow: hidden;

      img {
        height: 150px;
        width: 150px;
        border: 5px solid black;
        margin-bottom: 20px;
      }

      .link {
        text-align: center;
        font-size: 20px;
        color: #111;
      }

      h4 {
        width: 250px;;
        word-wrap: break-word;
        color: black;
      }
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
        background-color: #7B68EE;
        margin-top: 15px;
        width:500px;
        border: none;
      }

      Button:hover {
        background-color: #4B0082;
        border: none;
      }

      h3 {
        margin-top: 60px;
        background: -webkit-linear-gradient( rgba(252,70,107,1), rgba(63,94,251,1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
    <section style={ { textAlign: 'center' } }>
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
              </AlbumCard>
            </Link>
          ))
        }
      </SectionMusics>
    </section>);

  return (
    <div data-testid="page-search">
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
            >
              Pesquisar
            </Button>
            {artists.length === 0
              ? <h3 className="noAlbum">Nenhum álbum foi encontrado</h3>
              : renderAlbuns()}
          </FormStyled>)}
      <Footer />
    </div>
  );
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
