import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

const FeatureImage = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;

  position: relative;

  background-image: url(${(props) => props.img});

  background-repeat: no-repeat;
  background-size: 500px;
  background-position: center center;
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

const FeatureTitle = styled.h1`
  color: var(--colour-black);

  font-size: var(--text-xxxxl);
  margin: 0;
  margin-bottom: 1rem;
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
      <FeatureImage img={image.url} />
      <div>
        <FeatureContent>
          <FeatureTitle>{name}</FeatureTitle>
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
