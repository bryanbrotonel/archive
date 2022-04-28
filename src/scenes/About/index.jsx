import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import getContentfulData from '../../api/ContentfulDataAPI';

import Header from '../../components/Header';

const Container = styled.div`
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

  const body = JSON.stringify({ query });

  useEffect(() => {
    const fetchContentfulData = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(
          `/.netlify/functions/ContentfulDataAPI?query=${body}&collection='blurbCollection`
        );
        console.log(response);
        setAboutContent(response.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContentfulData();
  }, []);

  return (
    <div>
      <Container className="container">
        <Header title="Motive" subtitle="About" />
        {!isLoading && <p>{aboutContent}</p>}
      </Container>
    </div>
  );
}
export default About;
