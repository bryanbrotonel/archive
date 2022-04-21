import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
`;

const Subtitle = styled.h3`
  margin: 0;
  text-transform: uppercase;
  font-size: var(--text-sm);
  font-family: var(--font-secondary);
  color: var(--colour-primary);

  @media (min-width: 768px) {
    font-size: var(--text-md);
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: var(--text-xxxl);
  color: var(--colour-black);
`;

function Header(props) {
  const { subtitle, title, centered } = props;

  return (
    <Wrapper centered={centered}>
      <Subtitle>{subtitle}</Subtitle>
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default Header;
