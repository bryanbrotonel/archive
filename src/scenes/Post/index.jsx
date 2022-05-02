import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import fetchPost from '../../api/fetchPost';

import PostHeader from './PostHeader';
import FeatureArtist from './FeatureArtist';
import ArtistBanner from '../../components/ArtistBanner';

const PostContainer = styled.div`
  margin: 10% 0;
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

      console.log(artistsFeature)

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
          {artists.map((artist) => {
            return <ArtistBanner key={artist.link} artist={artist} />;
          })}
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
