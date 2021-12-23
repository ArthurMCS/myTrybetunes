import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default function Search() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState('');

  const minLength = 2;

  const handleInputSearch = ({ target }) => {
    setSearch(target.value);
    setArtistName(target.value);
  };

  const renderAlbuns = () => (
    <section>
      <p>{`Resultado de álbuns de: ${artistName}`}</p>
      {
        artists.map((artist, index) => (
          <div key={ index }>
            <Link
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
            >
              {artist.collectionName}
            </Link>
            <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
          </div>
        ))
      }
    </section>);

  return (
    <div data-testid="page-search">
      {isLoading
        ? <Loading />
        : (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ search }
              onChange={ handleInputSearch }
            />
            <button
              disabled={ search.length < minLength }
              type="submit"
              data-testid="search-artist-button"
              onClick={ async () => {
                setIsLoading(true);
                const response = await searchAlbumsAPI(search);
                setSearch('');
                setArtists(response);
                setIsLoading(false);
              } }
            >
              Pesquisar
            </button>
            {artists.length === 0
              ? 'Nenhum álbum foi encontrado'
              : renderAlbuns()}
          </>)}
    </div>
  );
}
