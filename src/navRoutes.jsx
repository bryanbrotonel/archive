import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const Home = lazy(() => import('./scenes/Home'));
const Share = lazy(() => import('./scenes/Share'));
const About = lazy(() => import('./scenes/About'));
const Post = lazy(() => import('./scenes/Post'));
const ArtistProfile = lazy(() => import('./scenes/Artist/ArtistProfile'));
const NotFound = lazy(() => import('./components/NotFound'));

const NavRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <React.Suspense fallback={<Loading />}>
          <Home />
        </React.Suspense>
      }
    ></Route>
    <Route
      path="/about"
      element={
        <React.Suspense fallback={<Loading />}>
          <About />
        </React.Suspense>
      }
    ></Route>
    <Route
      path="/blog/:blogID"
      element={
        <React.Suspense fallback={<Loading />}>
          <Post />
        </React.Suspense>
      }
    ></Route>
    <Route
      path="/artist/:artistID"
      element={
        <React.Suspense fallback={<Loading />}>
          <ArtistProfile />
        </React.Suspense>
      }
    ></Route>
    <Route
      path="/share"
      element={
        <React.Suspense fallback={<Loading />}>
          <Share />
        </React.Suspense>
      }
    ></Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default NavRoutes;
