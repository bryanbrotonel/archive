import React, { useEffect, useState } from 'react';
import getSpotifyAuth from '../../api/SpotifyAuthAPI';
import styled from 'styled-components';

const axios = require('axios').default;

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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchAuth = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(
          `/.netlify/functions/SpotifyAuthAPI`
        );
        setData(response);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuth();
  }, []);

  return (
    <HomeContainer>
      <div className="container">
        <h1>Hello World</h1>
        {!isLoading && <p>{data}</p>}
      </div>
    </HomeContainer>
  );
}

export default Home;
