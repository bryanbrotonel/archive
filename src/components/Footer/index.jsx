import React from 'react';

import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: var(--colour-primary);
  color: var(--colour-white);
  padding: 4rem 0;
  @media (min-width: 768px) {
    padding: 0;
  }
`;

const FooterRow = styled.div`
  width: 100%;

  height: 100%;
  display: flex;
  gap: 4rem;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    gap: 0rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;

const FooterContent = styled.div`
  display: grid;
  gap: 2rem;

  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    padding: 4rem 0;
  }
`;

const FooterTitle = styled.h1`
  font-size: var(--text-xxxl);
  font-weight: bold;
  margin: 0;
`;

const Copyright = styled.span`
  font-size: var(--text-xs);
  @media (min-width: 768px) {
    font-size: var(--text-sm);
  }
`;

function footer() {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterContent>
          <FooterTitle>React Starter Template</FooterTitle>
          <Copyright>
            &#169; {new Date().getFullYear()}. All Rights Reserved | Vancouver,
            BC
          </Copyright>
        </FooterContent>
        <div>
          <ul>
            <li>links</li>
            <li>links</li>
            <li>links</li>
            <li>links</li>
            <li>links</li>
          </ul>
        </div>
      </FooterRow>
    </FooterContainer>
  );
}

export default footer;
