import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default function MusicCard({ track }) {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { trackName, previewUrl, trackId } = track;
  const n = -1;

  const isChecked = favoriteSongs.findIndex((c) => c.trackId === trackId) !== n;

  const fetchFavoriteMusics = async () => {
    const response = await getFavoriteSongs();
    setFavoriteSongs(response);
  };

  const handleInputCheck = async () => {
    if (isChecked) {
      setIsLoading(true);
      await removeSong(track);
    } else {
      setIsLoading(true);
      await addSong(track);
    }
    await getFavoriteSongs();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteMusics();
  }, [favoriteSongs]);

  useEffect(() => () => {
    setIsLoading(false);
    setFavoriteSongs([]);
  }, []);

  return (
    <article>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        <code>audio</code>
      </audio>
      {
        isLoading
          ? <Loading />
          : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                checked={ isChecked }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                onChange={ handleInputCheck }
              />
            </label>
          )
      }
    </article>
  );
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
