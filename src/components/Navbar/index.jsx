import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  padding: 1.5rem 0;
  z-index: 1;
  background: var(--colour-white);
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-flow: end;
  justify-content: center;
  align-items: center;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  align-self: center;

  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--colour-black);

  &.homeLink {
    font-weight: bold;
    font-size: var(--text-lg);
    color: var(--colour-black);
  }

  &:hover {
    color: var(--colour-primary);
  }
`;

function Navbar() {
  return (
    <NavContainer>
        <LinksWrapper>
          <Link to="/about">About</Link>
          <Link to="/" className="homeLink">
            New New
          </Link>
          <Link to="/share">Share</Link>
        </LinksWrapper>
    </NavContainer>
  );
}

export default Navbar;
