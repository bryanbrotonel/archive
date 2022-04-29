import React from 'react';

import styled from 'styled-components';

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px; /* Footer height */

  background: var(--gradient-primary);
  color: var(--colour-black);
  padding: 4rem 0;
  
  @media (min-width: 768px) {
    padding: 0;
    height: 220px; /* Footer height */
  }
`;
const FooterContent = styled.div`
  display: grid;
  gap: 0.5rem;

  text-align: left;

  @media (min-width: 768px) {
    text-align: left;
    padding: 4rem 0;
  }
`;

const FooterTitle = styled.h1`
  font-size: var(--text-xxl);
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
      <FooterContent className="container">
        <FooterTitle>New New</FooterTitle>
        <Copyright>
          &#169; {new Date().getFullYear()}. All Rights Reserved | Vancouver, BC
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default footer;
