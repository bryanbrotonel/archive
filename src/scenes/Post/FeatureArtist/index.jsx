import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/Header';

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  gap: 2rem;

  margin-bottom: 20%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FeatureImageWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;

  flex-shrink: 0;
  transition: ease-out 0.3s;

  &:hover {
    transform: scale(1.025);
    transition: ease-out 0.3s;
  }
`;

const FeatureContent = styled.div`
  display: -webkit-box;
  width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: var(--colour-darkGrey);

  @media (min-width: 768px) {
    max-width: 600px;
    -webkit-line-clamp: 6;
  }

  @media (min-width: 992px) {
    -webkit-line-clamp: 4;
  }
`;

const ProfileLink = styled.span`
  display: inline-block;

  font-family: var(--font-secondary);
  font-size: inherit;
  font-weight: bold;
  text-decoration: none;
  color: var(--colour-black);
  margin: 1rem 0;
`;

function FeatureArtist(props) {
  const {
    artist: { name, image, bio, link },
  } = props;

  return (
    <FeatureContainer>
      <FeatureImageWrapper as={NavLink} to={`/artist/${link}`}>
        <FeatureImage src={image.url} loading="lazy"/>
      </FeatureImageWrapper>
      <div>
        <FeatureContent>
          <Header title={name} subtitle="Artist Spotlight" />
          <p>{bio}</p>
        </FeatureContent>
        <ProfileLink as={NavLink} to={`/artist/${link}`}>
          Read More
        </ProfileLink>
      </div>
    </FeatureContainer>
  );
}

export default FeatureArtist;
