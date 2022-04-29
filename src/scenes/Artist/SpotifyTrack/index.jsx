import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const TrackContainer = styled.div`
  display: grid;

  div,
  a {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const TrackBackground = styled.div`
  max-width: 325px;
  height: 40px;
  background-color: var(--colour-black);
  margin-top: 20px;
`;

const TrackContent = styled.div`
  &:hover {
    transform: translate(3px, -3px);
  }

  max-width: 300px;

  display: flex;
  justify-content: space-between;

  background-color: var(--colour-white);
  border: solid var(--colour-black);
  padding: 0.75em;

  text-decoration: none;
  color: var(--colour-black);

  margin-bottom: 1.5rem;
  margin-left: 7px;
`;

const TrackTitle = styled.span`
  font-family: var(--font-secondary);
`;

function SpotifyTrack(props) {
  const { title, href } = props;
  return (
    <TrackContainer>
      <TrackBackground />
      <TrackContent as="a" href={href} target="_blank">
        <TrackTitle>{title}</TrackTitle>
        <FontAwesomeIcon icon={faUpRightFromSquare} size="lg" />
      </TrackContent>
    </TrackContainer>
  );
}

export default SpotifyTrack;
