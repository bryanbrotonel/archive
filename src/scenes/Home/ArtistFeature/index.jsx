import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 50px;

    padding: 50px 0;
  }
`;

const ArtistContentWrapper = styled.div`
  width: 100%;
  margin-top: 2%;
  max-width: 556px;
`;

const ArtistImage = styled.img`
  width: 400px;
`;

const FeatureTitle = styled.h1`
  margin: 1rem 0;
  font-size: var(--text-xxxxl);
  line-height: 1em;

  @media (min-width: 768px) {
    font-size: var(--text-xxxl);
  }
`;

const ArtistContent = styled.p`
  display: -webkit-box;
  max-width: 450px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Link = styled.span`
  font-family: var(--font-secondary);
  text-decoration: none;
  color: var(--colour-black);
`;

function ArtistFeature(props) {
  // Artist data
  const {
    artist: { name, bio, image, link },
  } = props;

  return (
    <ArtistContainer>
      <div>
        <ArtistImage
          src={image.url}
          alt={`${name} - image`}
        />
      </div>
      <ArtistContentWrapper>
        <FeatureTitle>{name}</FeatureTitle>
        <ArtistContent>{bio}</ArtistContent>
        <Link as={NavLink} to={`artist/${link}`}>
          Read more
        </Link>
      </ArtistContentWrapper>
    </ArtistContainer>
  );
}

export default ArtistFeature;
