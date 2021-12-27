import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import styled from 'styled-components';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

const AlbumStyled = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      p {
        margin-top: 15px;
        font-size: 25px;
        color: #fff;
      }


      img {
        margin-top: 50px;
        height: 200px;
        width: 200px;
        border-radius: 50%;
        border: 8px solid #036b52;
        margin-bottom: 20px;
      }

`;

export default function Album(props) {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    const fetchMusics = async () => {
      const { match: { params } } = props;
      const { id } = params;
      const response = await getMusics(id);
      setMusics(response);
    };
    fetchMusics();
  }, [props]);

  return (
    <div data-testid="page-album">
      {
        musics.length === 0
          ? <Loading />
          : (
            <AlbumStyled>
              <section>
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                <h1 data-testid="artist-name">{ musics[0].artistName}</h1>
                <p data-testid="album-name">{ musics[0].collectionName}</p>
              </section>
              <section>
                {musics.slice(1).map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                  />
                ))}
              </section>
            </AlbumStyled>
          )
      }
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.shape(object),
}.isRequired;
