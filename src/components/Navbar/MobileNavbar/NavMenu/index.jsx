import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Menu = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;

  background: var(--colour-black);
  color: var(--colour-white);

  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: ${(props) => (props.display ? 'none' : 'translate(100%, 0)')};

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`;

const MenuContainer = styled.div`
  padding: 40px;
`;

const IconContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: auto;
`;

const NavLinkWrapper = styled.ul`
  margin-bottom: 50px;
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */

  & > li {
    margin-bottom: 1.5rem;
  }
`;

const Link = styled(NavLink)`
  font-family: var(--font-secondary);
  font-size: var(--text-lg);
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--colour-white);
`;

const Footer = styled.div`
  margin-top: 100px;
`;

function NavMenu(props) {
  return (
    <Menu display={props.display}>
      <MenuContainer>
        <IconContainer>
          <Icon icon={faX} size="lg" onClick={() => props.toggleMenu(false)} />
        </IconContainer>
        <NavLinkWrapper>
          {props.links.map((link) => {
            const linkPath = link[0];
            const linkName = link[1];

            return (
              <li key={linkName}>
                <Link to={linkPath} onClick={() => props.toggleMenu(false)}>
                  {linkName}
                </Link>
              </li>
            );
          })}
        </NavLinkWrapper>
        <Footer>
          <hr />
          <h1>New New</h1>
        </Footer>
      </MenuContainer>
    </Menu>
  );
}

export default NavMenu;
