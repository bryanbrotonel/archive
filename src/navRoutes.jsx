import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './scenes/Home';

const NavRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default NavRoutes;
