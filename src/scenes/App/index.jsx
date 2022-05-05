import React from 'react';
import styled from 'styled-components';

import NavRoutes from '../../navRoutes';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

const ContentWrap = styled.section`
  padding-bottom: calc(187px + (50px * 2)); /* Footer height and padding minus header size */

  @media (min-width: 768px) {
    padding-bottom: calc(166px + (50px * 2)); /* Footer height and padding */
  }
`;

const App = () => {
  return (
    <Container>
      <Navbar />
      <ContentWrap>
        <NavRoutes />
      </ContentWrap>
      <Footer />
    </Container>
  );
};

export default App;
