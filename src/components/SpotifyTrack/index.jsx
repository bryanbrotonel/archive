import React from 'react';
import styled from 'styled-components';

const TrackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 324px;

  border: solid var(--colour-black);
  padding: 1em;

  margin-bottom: 1.5rem;
  text-decoration: none;
  color: var(--colour-black);
`;

const TrackTitle = styled.span``;

function SpotifyTrack(props) {
  const { title, href } = props;
  return (
    <TrackContainer as="a" href={href} target="_blank">
      <div>
        <TrackTitle>{title}</TrackTitle>
      </div>
      <div>
        <span>Go</span>
      </div>
    </TrackContainer>
  );
}

export default SpotifyTrack;
