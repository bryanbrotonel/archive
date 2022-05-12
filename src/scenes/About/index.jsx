import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

const axios = require('axios').default;

const AboutContainer = styled.div`
  min-height: 90vh;
  margin-top: 10vh;
  
  @media (min-width: 768px) {
    max-width: 525px;
  }
`;

function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutContent, setAboutContent] = useState('');

  // NOTE: Variable must be named query
  const query = `
    query {
      blurbCollection(where:{title: "About"}){
        items {
          content
        }
      }
    }
  `;

  useEffect(() => {
    document.title = ` About | New New`;

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
        setAboutContent(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });

    setIsLoading(false);
  }, []);

  return (
    <div className="container">
      <AboutContainer>
        <Header title="Motive" subtitle="About" />
        {isLoading ? <Loading /> : <p>{aboutContent}</p>}
      </AboutContainer>
    </div>
  );
}
export default About;
