import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import fetchPost from '../../api/fetchPost';

import PostHeader from './PostHeader';
import FeatureArtist from './FeatureArtist';
import ArtistBanner from '../../components/ArtistBanner';

const PostContainer = styled.div`
  margin-top: 10%;
  margin-bottom: 20%;
`;

const ArtistWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 60px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const ArtistContainer = styled.div`
  text-align: center;
`;

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setpost] = useState(null);

  let params = useParams();
  let postComponent;

  // Get post parameter from url
  const linkParam = params.blogID;

  // Format URL
  const lastIndex = linkParam.lastIndexOf('-');
  const paramTitle = linkParam.slice(0, lastIndex).replaceAll('-', ' ');
  const paramID = linkParam.slice(lastIndex + 1);

  useEffect(() => {
    // Async function that fetches postData
    async function fetch() {
      let data = await fetchPost(paramID, paramTitle);

      // Set post data
      setpost(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
  }, []);

  if (!isLoading) {
    if (post == null)
      postComponent = (
        <div>
          <h1>post not Found</h1>
          <p>Is that a new post? Share it with the world!</p>
        </div>
      );
    else {
      const { title, subtitle, date, content, author, artists } = post;

      const artistsFeature = artists.shift();

      postComponent = (
        <PostContainer>
          <PostHeader
            title={title}
            subtitle={subtitle}
            date={date}
            author={author}
            content={content}
          />
          <FeatureArtist artist={artistsFeature} />
          <ArtistContainer>
            <h2>More Fresh Finds</h2>
            <ArtistWrapper>
              {artists.map((artist) => {
                return (
                  <NavLink
                    key={artist.link}
                    to={`/artist/${artist.link}`}
                  >
                    <ArtistBanner artist={artist} />
                  </NavLink>
                );
              })}
            </ArtistWrapper>
          </ArtistContainer>
        </PostContainer>
      );
    }
  }

  return (
    <div className="container">
      {isLoading ? <h1>Loading</h1> : postComponent}
    </div>
  );
}

export default Post;
