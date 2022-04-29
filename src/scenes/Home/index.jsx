import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchAllPosts from '../../api/fetchAllPosts';

import HomeHero from './HomeHero';
import PostPreview from './PostPreview';

const HomeContainer = styled.div`
  margin-top: 55vh;
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
      // // Remove home page link and assign to postLatest
      // const postLatest = posts.shift();

      // // Remaining pages assing to postRemaining
      // const postRemaining = posts;

      console.log(posts.length, posts)

      homeComponent = (
        <div>
          {posts.map((post) => {
            return <PostPreview key={post.date} post={post} />;
          })}
        </div>
      );
    }
  }

  return (
    <HomeContainer>
      <HomeHero />
      <div className="container">
        <h1>Home</h1>
        {isLoading ? <h1>Loading</h1> : homeComponent}
      </div>
    </HomeContainer>
  );
}

export default Home;
