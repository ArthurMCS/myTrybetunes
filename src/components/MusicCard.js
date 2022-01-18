import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const MusicCardStyled = styled.article`
      margin-bottom: 50px;;
  
      svg {
        height: 30px;
        width: 30px;
        margin-left: 400px;
        color: red;
        margin-top: 15px;;
      }

      svg:hover {
        cursor: pointer;
      }

      input {
        display: none;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      audio {
        position: absolute;
      }

      p {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      audio::-webkit-media-controls-panel {
        background: rgb(63,94,251);
        background: radial-gradient(circle, 
          rgba(63,94,251,1) 0%, 
          rgba(252,70,107,1) 100%);
      }

      @media (max-width: 1000px) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 360px;
        margin-bottom: 65px;
         
        svg {
          position: relative;
          margin-left: 0px;
          margin-top: 120px;
        }

        p {
          font-size: 20px;
          width: 320px;
          overflow: hidden;
          max-height: 80px;
          margin-bottom: -30px;
        }
          
        }
      
`;

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
    await fetchFavoriteMusics();
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
    <MusicCardStyled>
      <p>{trackName}</p>
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        {
          isLoading
            ? <Loading isMusicCard />
            : (
              <label htmlFor={ trackId }>
                {isChecked
                  ? <AiFillHeart />
                  : <AiOutlineHeart />}
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
      </div>
    </MusicCardStyled>
  );
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
