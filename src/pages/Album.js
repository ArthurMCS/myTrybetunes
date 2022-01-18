import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import styled from 'styled-components';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const AlbumStyled = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      h2 {
        margin-top: 200px;
        text-align: center;
        color: rgb(63,94,251)
      }


      p {
        margin-top: 15px;
        font-size: 25px;
      }


      img {
        margin-top: 50px;
        height: 200px;
        width: 200px;
        border-radius: 50%;
        border: 8px solid rgb(63,94,251);
        margin-bottom: 20px;
      }

      @media (max-width: 1000px) {

        h1 {
          text-align: center;
          max-width: 300px;
          word-wrap: break-word;
          overflow: hidden;
          color: rgb(63,94,251);
        }

        h2 {
          margin-top: 200px;
          text-align: center;
          max-width: 300px;
          font-size: 20px;
          word-wrap: break-word;
          color: rgb(63,94,251);
        }
        

        .album-name {
          text-align: center;
          word-wrap: break-word;
          max-width: 300px;
          color: rgb(63,94,251);
        }

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
        musics && musics.length === 0
          ? <Loading />
          : (
            <AlbumStyled>
              { !musics
                ? <h2>Desculpe, não conseguimos encontrar esse álbum</h2>
                : (
                  <>
                    <section>
                      <img
                        src={ musics[0].artworkUrl100 }
                        alt={ musics[0].collectionName }
                      />
                      <h1 data-testid="artist-name">{musics[0].artistName}</h1>
                      <p
                        data-testid="album-name"
                        className="album-name"
                      >
                        {musics[0].collectionName}
                      </p>
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
                )}

            </AlbumStyled>
          )
      }
      <Footer />
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.shape(object),
}.isRequired;
