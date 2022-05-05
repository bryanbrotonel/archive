import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import fetchAllPosts from '../../api/fetchAllPosts';

import HomeHero from './HomeHero';
import PostFeature from './PostFeature';
import Loading from '../../components/Loading';

const HomeContainer = styled.div`
  margin-top: 92vh;

  @media (min-width: 768px) {
    margin-top: 52vh;
  }
`;

const HomeWrapper = styled.div`
  padding-top: 5%;
  padding-bottom: 15%;
`;

const FeatureContainer = styled.div`
  display flex;
  flex-direction: column;
  gap: 2rem;

  margin-bottom: 15%;

  @media (min-width: 992px) {
      flex-direction: row;
  }
`;

const PrimaryWrapper = styled.div`
  flex-basis: 60%;
`;

const LatestWrapper = styled.div`
  @media (min-width: 1200px) {
    width: 70%;
  }
`;

const SecondaryWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  gap: 0.5rem;

  div {
    flex-basis: 50%;
  }

  @media (min-width: 992px) {
    flex-basis: 40%;
    flex-direction: column;
    gap: 3rem;
  }
`;

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  let homeComponent;

  useEffect(() => {
    // Async function that fetches all artists
    async function fetch() {
      let data = await fetchAllPosts();
      // Set Artist data
      setPosts(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
  }, []);

  if (!isLoading) {
    // Get primary post from list
    const primaryPost = posts.shift();

    // Get secondary post from list
    const secondaryPost = posts.shift();

    // Get tertiary post from list
    const tertiaryPost = posts.shift();

    homeComponent = (
      <div>
        <FeatureContainer>
          <PrimaryWrapper>
            <PostFeature post={primaryPost} theme={'primary'} />
          </PrimaryWrapper>
          <SecondaryWrapper>
            <PostFeature post={secondaryPost} theme={'secondary'} />
            <PostFeature post={tertiaryPost} theme={'secondary'} />
          </SecondaryWrapper>
        </FeatureContainer>
        {posts.length != 0 && (
          <div>
            <h1>Latest Posts</h1>
            {posts.map((post) => {
              return (
                <LatestWrapper key={post.id}>
                  <PostFeature post={post} />
                </LatestWrapper>
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    homeComponent = <Loading />;
  }

  return (
    <HomeContainer>
      <HomeHero />
      <HomeWrapper className="container">{homeComponent}</HomeWrapper>
    </HomeContainer>
  );
}

export default Home;
