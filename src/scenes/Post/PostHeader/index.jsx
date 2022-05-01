import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin-bottom: 20%;
`;

const Title = styled.h1`
  font-size: var(--text-xxxxl);
  margin: 0;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  margin: 0;

  font-family: var(--font-secondary);
  font-weight: normal;
  font-size: var(--text-lg);
`;

const MetaData = styled.span`
  display: inline-block;
  margin: 3rem 0;
`;

const ContentWrapper = styled.div`
  p {
    margin: 0;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

function PostHeader(props) {
  const { title, subtitle, date, author, content } = props;

  // Format date
  const dateObj = new window.Date(date);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateFormatted = dateObj.toLocaleDateString('en-US', options);

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <MetaData>
        {dateFormatted}&ensp;<span>&#8226;</span>&ensp;by {author}
      </MetaData>
      <ContentWrapper>
        <p>{content}</p>
      </ContentWrapper>
    </HeaderContainer>
  );
}

export default PostHeader;
