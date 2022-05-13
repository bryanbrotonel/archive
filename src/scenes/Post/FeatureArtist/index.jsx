import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Header from '../../../components/Header';

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  gap: 2rem;
  margin-bottom: 20%;

  text-decoration: none;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const FeatureImageWrapper = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (min-width: 768px) {
    max-width: 500px;
  }
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
  display: none;

  @media (min-width: 768px) {
    max-width: 600px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    color: var(--colour-darkGrey);
  }
`;

const ProfileLink = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline-block;

    font-family: var(--font-secondary);
    font-size: inherit;
    font-weight: bold;
    text-decoration: none;
    color: var(--colour-black);
    margin: 1rem 0;
  }
`;

function FeatureArtist(props) {
  const {
    artist: { name, image, bio, link },
  } = props;

  return (
    <FeatureContainer as={NavLink} to={`/artist/${link}`}>
      <FeatureImageWrapper>
        <FeatureImage src={image.url} alt={`${name} - Image`} loading="lazy" />
      </FeatureImageWrapper>
      <ContentContainer>
        <Header title={name} subtitle="Artist Spotlight" />
        <FeatureContent>
          <ReactMarkdown children={bio} />
        </FeatureContent>
        <ProfileLink>Read More</ProfileLink>
      </ContentContainer>
    </FeatureContainer>
  );
}

export default FeatureArtist;
