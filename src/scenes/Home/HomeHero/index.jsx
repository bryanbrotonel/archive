import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  width: 100%;
  height: 60vh;

  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-image: var(--gradient-primary);

  text-align: center;
`;

const HeroContent = styled.div`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const HeroTitle = styled.h1`
  font-size: var(--text-xxl);
  margin: 0;
`;

const DiscoverButton = styled.button`
  display: inline-block;
  padding: 1rem;
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
        <HeroTitle>Lorem ipsum dolor</HeroTitle>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          porro magnam
        </p>
        <DiscoverButton>Discover the New New</DiscoverButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default HomeHero;
