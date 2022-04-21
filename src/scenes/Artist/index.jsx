import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist } from '../../api/SpotifyArtistAPI';

function Artist() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [artist, setArtist] = useState(null);

  let params = useParams();
  let dataElement;

  useEffect(() => {
    getArtist(params.artistID).then((res) => {
      setArtist(res);
      setIsLoaded(true);
    });
  }, []);

  if (isLoaded) {
    dataElement = <pre>{JSON.stringify(artist, null, 2)}</pre>;
  }

  return (
    <div className='container'>
      <h1>Artist Page</h1>
      {dataElement}
    </div>
  );
}

export default Artist;
