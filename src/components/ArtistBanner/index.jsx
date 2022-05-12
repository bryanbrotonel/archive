import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  width: 300px;
  height: 400px;

  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;

  color: var(--colour-white);

  &:hover > img {
    transform: scale(1.025);
    transition: ease-out 0.3s;
    transition: ease-out 0.3s;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;

  transition: ease-out 0.3s;
`;

const BannerContent = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  
  text-align: left;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(38, 38, 38, 0.73)
  );
`;

const BannerTitle = styled.h1`
  position: absolute;
  bottom: 0;

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
      <BannerImage src={image.url} loading="lazy" />
      <BannerContent>
        <BannerTitle>{name}</BannerTitle>
      </BannerContent>
    </Banner>
  );
}

export default ArtistBanner;
