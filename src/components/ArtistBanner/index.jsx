import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  width: 300px;
  height: 400px;

  position: relative;
  overflow: hidden;

  color: var(--colour-white);

  @media (min-width: 768px) {
  }
`;

const BannerImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(38, 38, 38, 0.73)
    ),
    url(${(props) => props.img});

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  transition: ease-out 0.3s;

  &:hover {
    transform: scale(1.025);
    transition: ease-out 0.3s;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
`;

const BannerTitle = styled.h1`
  margin: 0 0 1rem 1rem;
  font-size: var(--text-xxxl);
  line-height: 1em;

  @media (min-width: 768px) {
    font-size: var(--text-xl);
  }
`;

function ArtistBanner(props) {
  // Artist data
  const {
    artist: { name, image },
  } = props;

  return (
    <Banner>
      <BannerImage img={image.url} />
      <BannerContent>
        <BannerTitle>{name}</BannerTitle>
      </BannerContent>
    </Banner>
  );
}

export default ArtistBanner;
