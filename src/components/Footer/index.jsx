import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  min-height: 70px; /* Footer height */

  position: absolute;
  bottom: 0;

  background: var(--colour-black);
  color: var(--colour-white);
  padding: 50px 0;
`;

const FooterWrapper = styled.div``;

const FooterContent = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const FooterTitle = styled.span`
  display: block;

  margin-bottom: 0.5rem;

  font-family: var(--font-primary);
  font-size: var(--text-xxl);
  font-weight: bold;
`;

const FooterSubtitle = styled.span`
  display: block;

  font-family: var(--font-secondary);
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

const FooterLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    opacity: 0.6;
  }
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function footer() {
  return (
    <FooterContainer>
      <FooterWrapper className="container">
        <FooterContent>
          <FooterTitle>New New</FooterTitle>
          <FooterSubtitle>
            A curation of everday music discoveries
          </FooterSubtitle>
        </FooterContent>
        <FooterNav>
          <div>
            <span>
              Made with <FontAwesomeIcon icon={faHeart} size="xs" /> by{' '}
              <FooterLink as='a' href="https://bryanbrotonel.live/">
                Bryan
              </FooterLink>
            </span>
          </div>
          <FooterLinksWrapper>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/share">Share</FooterLink>
          </FooterLinksWrapper>
        </FooterNav>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default footer;
