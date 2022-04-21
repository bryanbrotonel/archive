import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpotifyArtist } from '../../api/SpotifyArtistAPI';
import getContentfulData from '../../api/ContentfulDataAPI';

function Artist() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [artist, setArtist] = useState(null);

  let params = useParams();
  let dataElement;
  const linkParam = params.artistID;
  var capitalLinkParam =
    linkParam[0].toUpperCase() + linkParam.slice(1).toLowerCase();

  const contentfulQuery = `
  query {
    artistCollection(where:{name: "${capitalLinkParam}"}){
      items{
        artistId
        artistBio
      }
    }
  }`;

  useEffect(() => {
    getContentfulData(contentfulQuery, 'artistCollection').then(
      (contentfulRes) => {
        getSpotifyArtist(contentfulRes.artistId).then((spotifyRes) => {
          console.log(contentfulRes);
          console.log(spotifyRes);
          setArtist({
            name: spotifyRes.name,
            bio: contentfulRes.artistBio,
            image: spotifyRes.images[0],
            genres: spotifyRes.genres,
          });
          setIsLoaded(true);
        });
      }
    );
  }, []);

  if (isLoaded) {
    const { name, bio, image, genres } = artist;

    dataElement = (
      <div>
        <img
          src={image.url}
          alt={`${name} - Image`}
          width={`${image.width}`}
          height={`${image.height}`}
        />
        <h1>{name}</h1>
        <h4>{genres.join(' ')}</h4>
        <p>{bio}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Artist Page</h1>
      {dataElement}
    </div>
  );
}

export default Artist;
