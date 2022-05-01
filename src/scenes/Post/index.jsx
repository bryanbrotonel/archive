import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import fetchPost from '../../api/fetchPost';

import ArtistBanner from '../../components/ArtistBanner';

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
      const { title, subtitle, date, content, artists } = post;

      postComponent = (
        <div>
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
          <span>{date}</span>
          <p>{content}</p>
          {artists.map((artist) => {
            return <ArtistBanner key={artist.link} artist={artist} />;
          })}
        </div>
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
