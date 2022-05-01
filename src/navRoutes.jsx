import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './scenes/Home';
import ArtistProfile from './scenes/Artist/ArtistProfile';
import Share from './scenes/Share';
import About from './scenes/About';
import Post from './scenes/Post';

const NavRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path=":blogID" element={<Post />}></Route>
    <Route path="/artist/:artistID" element={<ArtistProfile />}></Route>
    <Route path="/share" element={<Share />}></Route>
    <Route
      path="*"
      element={
        <div className="container">
          <p>Nothing here!</p>
        </div>
      }
    />
  </Routes>
);

export default NavRoutes;
