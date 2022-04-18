import React, { useEffect, useState } from 'react';
import getSpotifyAuth from '../../api/SpotifyAuthAPI';

import styled from 'styled-components';

const HomeContainer = styled.div`
  & > div {
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) {
    & > div {
      margin-bottom: 12rem;
    }
  }
`;

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    getSpotifyAuth().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <HomeContainer className="container">
      <h1>Hello World</h1>
      <span>{data}</span>
    </HomeContainer>
  );
}

export default Home;
