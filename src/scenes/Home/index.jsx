import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import fetchAllArtists from '../../api/fetchAllArtists';

import HomeHero from './HomeHero';
import ArtistFeature from './ArtistFeature';
import ArtistBanner from '../../components/ArtistBanner';

const HomeContainer = styled.div`
  margin-top: 51vh;
`;

const BannerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  grid-gap: 50px;

  padding: 75px 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, 300px);
  }
`;

const LinkComponent = styled(NavLink)`
  text-decoration: none;
`;

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  let homeComponent;

  useEffect(() => {
    // Async function that fetches all artists
    async function fetch() {
      let data = await fetchAllArtists();
      // Set Artist data
      setArtists(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
  }, []);

  if (!isLoading) {
    if (artists == []) {
      homeComponent = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    } else {
      // Find featured artist
      const featuredArtist = artists.find((artist) => artist.featured);

      if (featuredArtist != null) {
        // Remove featured artist
        const index = artists.indexOf(featuredArtist);
        if (index > -1) {
          artists.splice(index, 1);
        }
      }

      homeComponent = (
        <div>
          {featuredArtist != null && <ArtistFeature artist={featuredArtist} />}
          <BannerGrid>
            {artists.map((artist) => {
              return (
                <LinkComponent key={artist.link} to={`artist/${artist.link}`}>
                  <ArtistBanner artist={artist} />
                </LinkComponent>
              );
            })}
          </BannerGrid>
        </div>
      );
    }
  }

  return (
    <HomeContainer>
      <HomeHero />
      <div className="container">
        {isLoading ? <h1>Loading</h1> : homeComponent}
      </div>
    </HomeContainer>
  );
}

export default Home;
