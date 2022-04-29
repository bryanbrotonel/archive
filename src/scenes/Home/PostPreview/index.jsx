import React from 'react';

function PostPreview(props) {
  const {
    post: { title, content, artists },
  } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p></p>
    </div>
  );
}

export default PostPreview;
