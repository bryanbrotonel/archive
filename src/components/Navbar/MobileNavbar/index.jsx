import React, { useState } from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div``;

function MobileNavbar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <React.Fragment>
      <NavbarContainer className="container">
        <TitleWrapper>
          <h1>New New</h1>
        </TitleWrapper>
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
