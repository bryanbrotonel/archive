import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  width: 100%;
  min-width: 300px;
  height: 400px;

  position: relative;

  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(38, 38, 38, 0.73)
    ),
    url(${(props) => props.img});

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  color: var(--colour-white);

  @media (min-width: 768px) {
    width: 350px;
    height: 450px;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
`;

const BannerTitle = styled.h1`
  margin: 0 0 1rem 1rem;
  font-size: var(--text-xxxxl);
  line-height: 1em;

  @media (min-width: 768px) {
    font-size: var(--text-xxxl);
  }
`;

function ArtistBanner(props) {
  // Artist data
  const {
    artist: { name, image },
  } = props;

  return (
    <Banner img={image.url}>
      <BannerContent>
        <BannerTitle>{name}</BannerTitle>
      </BannerContent>
    </Banner>
  );
}

export default ArtistBanner;
