import React from 'react';
import styled from 'styled-components';

const ArtistImageContainer = styled.div`
  padding: 30px 0;
`;

const ArtistImageWrapper = styled.div`
  position: relative;
  height: 320px;
  width: 320px;
`;

const ArtistBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: var(--gradient-primary);
`;

const ProfileImage = styled.img`
  position: absolute;
  top: -20px;
  right: -20px;
`;

function ArtistImage(props) {
  const { url, width, height, name } = props;

  return (
    <ArtistImageContainer>
      <ArtistImageWrapper>
        <ArtistBackground></ArtistBackground>
        <ProfileImage
          src={url}
          alt={`${name} - Image`}
          width={`${width}`}
          height={`${height}`}
        />
      </ArtistImageWrapper>
    </ArtistImageContainer>
  );
}

export default ArtistImage;
