import React from 'react';
import styled from 'styled-components';

import { HashLink } from 'react-router-hash-link';

const HeroContainer = styled.div`
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-image: var(--gradient-primary);

  text-align: center;

  @media (min-width: 768px) {
    height: 60vh;
  }
`;

const HeroContent = styled.div`
  @media (min-width: 768px) {
    padding: 10% 0;
    width: 40%;
  }
`;

const HeroTitle = styled.h1`
  font-size: var(--text-xxxl);
  margin: 0;
`;

const DiscoverButton = styled.button`
  display: inline-block;
  padding: 1rem 1.5rem;
  margin: 1rem;

  background-color: var(--colour-black);
  border: none;

  font-family: var(--font-primary);
  font-size: var(--text-md);

  text-align: center;
  text-decoration: none;
  color: var(--colour-white);

  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

function HomeHero() {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Discover the Newness</HeroTitle>
        <p>
          We introduce the exciitng sounds of tomorrow to the world. Get
          familiar with these new artists now and discover your next favourite
          artist.
        </p>
        <DiscoverButton
          as={HashLink}
          to="/#home"
          smooth
        >
          Start Digging
        </DiscoverButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default HomeHero;
