import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

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
            <>
              <section>
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                <p data-testid="artist-name">{ musics[0].artistName}</p>
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
            </>
          )
      }
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.shape(object),
}.isRequired;
