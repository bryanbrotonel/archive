import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  margin: auto;
  padding: 50px 0;

  text-align: center;
  font-size: var(--text-lg);
  font-weight: bold;
  font-family: var(--font-primary);
`;

function Loading() {
  return (
    <LoadingContainer>
      <span>NewNew</span>
    </LoadingContainer>
  );
}

export default Loading;
