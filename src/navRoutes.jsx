import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './scenes/Home';
import Artist from './scenes/Artist';

const NavRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/artist/:artistID" element={<Artist />}></Route>
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
