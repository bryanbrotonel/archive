import React from 'react';
import styled from 'styled-components';

const ArtistImageContainer = styled.div`
  display: grid;

  div {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const ArtistBackground = styled.div`
  height: ${(props) => props.height + 'px'};
  width: ${(props) => props.width + 'px'};
  
  background-image: var(--gradient-primary);
  margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
  margin-left: 20px;

  img {
    object-fit: cover;
  }
`;

function ArtistImage(props) {
  const { url, width, height, name } = props;

  return (
    <ArtistImageContainer>
      <ArtistBackground width={width} height={height}></ArtistBackground>
      <ProfileImageWrapper>
        <img
          src={url}
          alt={`${name} - Image`}
          width={`${width}`}
          height={`${height}`}
        />
      </ProfileImageWrapper>
    </ArtistImageContainer>
  );
}

export default ArtistImage;
