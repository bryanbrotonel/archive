import React, { useState } from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;

function MobileNavbar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <React.Fragment>
      <NavbarContainer className="container">
        <div>
          <Title>New New</Title>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          onClick={() => setToggleMenu(true)}
        />
      </NavbarContainer>
      <NavMenu
        links={props.links}
        display={+toggleMenu}
        toggleMenu={setToggleMenu}
      />
    </React.Fragment>
  );
}

export default MobileNavbar;
