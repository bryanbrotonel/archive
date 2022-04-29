import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import HomeHero from './HomeHero';

const HomeContainer = styled.div`
  margin-top: 55vh;
`;

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HomeContainer>
      <HomeHero />
      <div className="container">
        <h1>Home</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
          inventore hic optio illo laboriosam eaque consequatur repellat numquam
          amet, obcaecati quis ea dicta sed tenetur fugiat nemo minus libero
          praesentium.
        </p>
      </div>
    </HomeContainer>
  );
}

export default Home;
