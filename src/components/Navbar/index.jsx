import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const NavContainer = styled.div`
  height: 78px;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
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
    ['/', 'New New'],
    ['/share', 'Share'],
    ['/about', 'About'],
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
