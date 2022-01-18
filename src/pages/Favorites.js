import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const PageFavorites = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      margin-bottom: 60px;

      p {
        font-size: 20px;
      }

      /* https://css-tricks.com/snippets/css/gradient-text/ */
      .favoritesP {
        margin-top: 15px;
        font-size: 25px;
        background: -webkit-linear-gradient( rgba(252,70,107,1), rgba(63,94,251,1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
`;

export default function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavoriteMusics = async () => {
    const response = await getFavoriteSongs();
    setFavoriteSongs(response);
  };

  useEffect(() => {
    fetchFavoriteMusics()
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchFavoriteMusics();
  }, [favoriteSongs]);

  useEffect(() => () => {
    setFavoriteSongs([]);
    setIsLoading({});
  }, []);

  const text = (
    favoriteSongs.length === 1
      ? '1 Música curtida'
      : `${favoriteSongs.length} Músicas curtidas`
  );

  return (
    <PageFavorites data-testid="page-favorites">
      {isLoading
        ? <Loading />
        : (
          <>
            {favoriteSongs.length > 0
              ? <p className="favoritesP">{text}</p>
              : <p className="favoritesP">Ainda não há músicas curtidas</p>}
            {favoriteSongs.map((track) => (
              <MusicCard
                key={ track.trackId }
                track={ track }
              />
            ))}
          </>)}
      <Footer />
    </PageFavorites>
  );
}
