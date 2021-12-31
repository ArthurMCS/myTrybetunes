import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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

const MusicCard = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 300px;
      width: 300px;
      background-color:  #4B0082;
      margin: 30px;
      border-radius: 20%;

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
        color: #fff;
      }
`;

export default function Search({ history }) {
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
            <MusicCard
              key={ index }
              className="musicCard"
              onClick={ () => history.push(`/album/${artist.collectionId}`) }
            >
              <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
              <Link
                data-testid={ `link-to-album-${artist.collectionId}` }
                to={ `/album/${artist.collectionId}` }
                style={ { textDecoration: 'none' } }
                className="link"
              >
                <h4>{artist.collectionName}</h4>
              </Link>
            </MusicCard>
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
              ? <h3>Nenhum álbum foi encontrado</h3>
              : renderAlbuns()}
          </FormStyled>)}
    </div>
  );
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
