import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import fetchAllPosts from '../../api/fetchAllPosts';

import HomeHero from './HomeHero';
import PostFeature from './PostFeature';

const HomeContainer = styled.div`
  margin-top: 52vh;
`;

const BannerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  grid-gap: 50px;

  padding: 75px 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, 300px);
  }
`;

const LinkComponent = styled(NavLink)`
  text-decoration: none;
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
    if (posts == []) {
      homeComponent = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    } else {
      console.log(posts);
      homeComponent = (
        <div>
          {posts.map((post) => {
            return <div key={post.id}>
              <PostFeature post={post}/>
            </div>;
          })}
        </div>
      );
    }
  }

  return (
    <HomeContainer>
      <HomeHero />
      <div className="container">
        {isLoading ? <h1>Loading</h1> : homeComponent}
      </div>
    </HomeContainer>
  );
}

export default Home;
