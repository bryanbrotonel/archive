import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import formatDate from '../../../api/FormatDate';

function PostFeature(props) {
  const {
    post: { title, subtitle, date, author, content, artists },
  } = props;

  const featuredArtist = artists[0];
  const artistImage = featuredArtist.image.url;

  // Format date
  var dateFormatted = formatDate(date);
  
  return (
    <div>
      <img src={artistImage} alt={`${featuredArtist.name} - Image`} />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <span>
        {dateFormatted} by {author}
      </span>
      <p>{content}</p>
    </div>
  );
}

export default PostFeature;
