import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getContentfulData from '../../api/ContentfulDataAPI';

import Header from '../../components/Header';

const Container = styled.div`
  @media (min-width: 768px) {
    max-width: 525px;
  }
`;

function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutContent, setAboutContent] = useState('');

  const contentfulQuery = `
    query {
      blurbCollection(where:{title: "About"}){
        items {
          content
        }
      }
    }
  `;

  useEffect(() => {
    getContentfulData(contentfulQuery, 'blurbCollection').then((res) => {
      setAboutContent(res.content);
      setIsLoading(true);
    });
  });

  return (
    <div className="container">
      <Container>
        <Header title="Motive" subtitle="About" />
        {isLoading && <p>{aboutContent}</p>}
      </Container>
    </div>
  );
}
export default About;
