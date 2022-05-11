import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import shareArtist from '../../api/FirebaseDatabaseAPI';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

const axios = require('axios').default;

const ShareContainer = styled.div`
  min-height: 90vh;

  @media (min-width: 768px) {
    max-width: 525px;
  }
`;

const Input = styled.input`
  border: solid var(--colour-black);
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  color: var(--colour-black);
  padding: 0.5em 0.5em;
  margin: 1em 0.5em 1em 0;
`;

const Submit = styled.button`
  display: block;
  padding: 0.5rem 1.5em;
  margin: 1em 0;

  background-color: var(--colour-black);
  border: none;

  font-size: var(--text-md);
  font-family: var(--font-primary);

  text-align: center;
  text-decoration: none;
  color: var(--colour-white);
`;

function Share() {
  const [artistValue, setArtistValue] = useState('');
  const [notableValue, setNotableValue] = useState('');
  const [handleValue, setHandleValue] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [shareContent, setShareContent] = useState('');

  // NOTE: Variable must be named query
  const query = `
    query {
      blurbCollection(where:{title: "Share"}){
        items {
          content
        }
      }
    }
  `;

  useEffect(() => {
        document.title = `Share | New New`;

    setIsLoading(true);

    // POST request to fetch Contentful data
    axios
      .post('/.netlify/functions/ContentfulDataAPI', {
        // Query to fetch sepcified data
        query: query,
        // Collection to fetch data from
        collection: 'blurbCollection',
      })
      .then(function (response) {
        // Set content with fetched data
        setShareContent(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });

    setIsLoading(false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    shareArtist(artistValue, notableValue, handleValue).then(
      setFormSubmitted(true)
    );
  };

  return (
    <div className="container">
      <ShareContainer>
        <Header title="Sharing is Caring" subtitle="Share" />
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <p>{shareContent}</p>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Artist"
                value={artistValue}
                onChange={(event) => setArtistValue(event.target.value)}
              />
              <Input
                type="text"
                placeholder="Notable"
                value={notableValue}
                onChange={(event) => setNotableValue(event.target.value)}
              />
              <Input
                type="text"
                placeholder="Handle"
                value={handleValue}
                onChange={(event) => setHandleValue(event.target.value)}
              />
              <Submit type="submit">Submit</Submit>
            </form>
            {formSubmitted && <p>Thanks for sharing!</p>}
          </React.Fragment>
        )}
      </ShareContainer>
    </div>
  );
}

export default Share;
