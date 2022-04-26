import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const NavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  padding: 1.5rem 0;
  z-index: 1;
  background: var(--colour-white);
`;

function Navbar() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    function checkDesktop() {
      setDesktop(window.innerWidth > 992);
    }

    window.addEventListener('resize', checkDesktop);

    checkDesktop();

    return function cleanup() {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  const links = [
    ['/about', 'About'],
    ['/', 'New New'],
    ['/share', 'Share'],
  ];
  return (
    <NavContainer>
      {isDesktop ? (
        <DesktopNavbar links={links} />
      ) : (
        <MobileNavbar links={links} />
      )}
    </NavContainer>
  );
}

export default Navbar;
