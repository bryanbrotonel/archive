import React from 'react';
import styled from 'styled-components';
import ButtonLink from '../ButtonLink';

const NotFoundContainer = styled.div`
  height: 50vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: var(--text-xxxxl);
  margin: 0;
`;

const NotFoundSubtitle = styled.h4`
  color: var(--colour-darkGrey);
  margin: 0;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <HeaderContainer>
        <NotFoundTitle>404 Not Found</NotFoundTitle>
        <NotFoundSubtitle>Don't get lost in the sauce.</NotFoundSubtitle>
      </HeaderContainer>
      <ButtonLink url="/">Keep Browsing</ButtonLink>
    </NotFoundContainer>
  );
}

export default NotFound;
