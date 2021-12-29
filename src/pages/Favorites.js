import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

const PageFavorites = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;

      p {
        font-size: 25px;
      }
`;

export default function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const fetchFavoriteMusics = async () => {
    const response = await getFavoriteSongs();
    setFavoriteSongs(response);
  };

  useEffect(() => {
    fetchFavoriteMusics();
  }, [favoriteSongs]);

  useEffect(() => () => {
    setFavoriteSongs([]);
  }, []);

  return (
    <PageFavorites data-testid="page-favorites">
      {favoriteSongs.map((track) => (
        <MusicCard
          key={ track.trackId }
          track={ track }
        />
      ))}
    </PageFavorites>
  );
}
