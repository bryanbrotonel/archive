import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import formatDate from '../../../api/FormatDate';

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: ${(props) => props.theme.direction};
  }
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  flex-basis: ${(props) => props.theme.basis};
`;

const ImageWrapper = styled.div`
  height: 250px;
  width: 100%;

  overflow: hidden;

  @media (min-width: 768px) {
    height: ${(props) => props.theme.imageHeight};
    width: ${(props) => props.theme.imageWidth};
    min-height: 250px;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.img});

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  transition: ease-out 0.3s;

  &:hover {
    transform: scale(1.025);
    transition: ease-out 0.3s;
  }
`;

const ContentWraper = styled.div`
  flex-grow: 1;
  flex-basis: 50%;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  color: var(--colour-darkGrey);
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
`;

const MetaData = styled.span`
  display: inline-block;
  font-family: var(--font-primary);
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

const themeDefault = {
  imageHeight: '100%',
  imageWidth: '400px',
  direction: 'row',
  basis: '0'
};

const themePrimary = {
  imageHeight: '400px',
  imageWidth: 'auto',
  direction: 'column',
  basis: '50%'
};

const themeSecondary = {
  imageHeight: '100%',
  imageWidth: 'auto',
  direction: 'row',
  basis: '50%'
};

function PostFeature(props) {
  const {
    post: { title, subtitle, date, author, link, content, artists },
    theme,
  } = props;

  const featuredArtist = artists[0];
  const artistImage = featuredArtist.image.url;

  // Format date
  var dateFormatted = formatDate(date);

  var currentTheme = themeDefault;

  if (theme != null) {
    switch (theme) {
      case 'primary':
        currentTheme = themePrimary;
        break;
      case 'secondary':
        currentTheme = themeSecondary;
        break;
      default:
        break;
    }
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <ImageContainer as={NavLink} to={`${link}`}>
          <ImageWrapper>
            <PostImage img={artistImage} />
          </ImageWrapper>
        </ImageContainer>
        <ContentWraper>
          <Title>{title}</Title>
          <MetaData>
            {dateFormatted}&ensp;<span>&#8226;</span>&ensp;{author}
          </MetaData>
          <Content>
            <p>{content}</p>
          </Content>
          <ProfileLink as={NavLink} to={`${link}`}>
            Read More
          </ProfileLink>
        </ContentWraper>
      </Container>
    </ThemeProvider>
  );
}

export default PostFeature;
