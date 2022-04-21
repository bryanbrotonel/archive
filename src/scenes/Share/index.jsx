import React, { useState, useEffect } from 'react';
import shareArtist from '../../api/FirebaseDatabaseAPI';

function Share() {
  const [artistValue, setArtistValue] = useState('');
  const [notableValue, setNotableValue] = useState('');
  const [handleValue, setHandleValue] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    shareArtist(artistValue, notableValue, handleValue).then(
      setFormSubmitted(true)
    );
  };

  return (
    <div className="container">
      <h1>Share</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam eu
        dignissim aliquam neque mauris viverra. Sapien, tortor ac tortor sed
        nibh consectetur sed neque. Aenean feugiat tincidunt enim natoque eros.
        Nulla semper ac quis neque nec sed a mattis. Cras aliquam urna faucibus
        dolor sit gravida.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Artist"
          value={artistValue}
          onChange={(event) => setArtistValue(event.target.value)}
        />
        <input
          type="text"
          placeholder="Notable"
          value={notableValue}
          onChange={(event) => setNotableValue(event.target.value)}
        />
        <input
          type="text"
          placeholder="Handle"
          value={handleValue}
          onChange={(event) => setHandleValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {formSubmitted && <p>Form Submitted!</p>}
    </div>
  );
}

export default Share;
