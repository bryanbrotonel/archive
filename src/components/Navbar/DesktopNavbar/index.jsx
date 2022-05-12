import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
`;

const PagesWrapper = styled.div`
  display: flex;
  flex-grow: 0.3;
  flex-flow: end;

  justify-content: flex-end;
  gap: 4rem;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  align-self: center;

  font-family: var(--font-secondary);
  font-weight: bold;
  color: var(--colour-black);

  transition: 0.2s;

  &.homeLink {
    font-family: var(--font-primary);
    font-size: var(--text-lg);
  }

  &:hover {
    opacity: 0.6;
  }
`;

function DesktopNavbar(props) {
  const { links } = props;

  // Remove home page link and assign to variable
  const home = links.shift();

  // Remaining pages
  const pages = links;

  return (
    <NavWrapper className="container">
      <Link to={home[0]} className="homeLink">
        {home[1]}
      </Link>
      <PagesWrapper>
        {pages.map((link) => {
          const linkPath = link[0];
          const linkName = link[1];

          return (
            <Link key={linkName} to={linkPath}>
              {linkName}
            </Link>
          );
        })}
      </PagesWrapper>
    </NavWrapper>
  );
}

export default DesktopNavbar;
