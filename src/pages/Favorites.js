import React, { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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
    <div data-testid="page-favorites">
      {favoriteSongs.map((track) => (
        <MusicCard
          key={ track.trackId }
          track={ track }
        />
      ))}
    </div>
  );
}
