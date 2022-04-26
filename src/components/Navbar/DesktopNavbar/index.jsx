import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

function DesktopNavbar(props) {
  console.log(
    props.links.map((link) => {
      return link[0];
    })
  );
  return (
    <React.Fragment>
      <LinksWrapper>
        {props.links.map((link) => {
          const linkPath = link[0];
          const linkName = link[1];
          return (
            <Link
              key={linkName}
              to={linkPath}
              className={linkPath == '/' && 'homeLink'}
            >
              {linkName}
            </Link>
          );
        })}
      </LinksWrapper>
    </React.Fragment>
  );
}

export default DesktopNavbar;
