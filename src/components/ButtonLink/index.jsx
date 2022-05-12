import React from "react";
import styled from "styled-components";

const SpotifyButton = styled.button`
  display: inline-block;
  padding: 1rem;

  background-color: var(--colour-black);
  border: none;

  font-family: var(--font-primary);

  text-align: center;
  text-decoration: none;
  color: var(--colour-white);

  transition: 0.2s;

  &:hover {
    opacity: 0.6;
  }
`;

function ButtonLink(props) {
  const {url, children} = props;

  return (
    <SpotifyButton as="a" href={url}>
      {children}
    </SpotifyButton>
  );
}

export default ButtonLink;