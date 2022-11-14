/* eslint-disable react/prop-types */
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import Home from '../Home';
import NoMatch from '../NoMatch';
import Login from '../Login';
import Register from '../Register';
import Blocked from '../Blocked';
import Dump from '../Dump';
import DumpHistory from '../DumpHistory';

const PrivateRoute = ({ children }) => {
  const isUserAuthenticated = useSelector((state) => state.user.loggedIn);
  return isUserAuthenticated ? children : <Navigate to="/login" />;
};

const RoutesWrapper = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/blocked"
        element={(
          <PrivateRoute>
            <Blocked />
          </PrivateRoute>
                )}
      />
      <Route
        path="/dump/:dumpId"
        element={(
          <PrivateRoute>
            <Dump />
          </PrivateRoute>
                )}
      />
      <Route
        path="/dumps"
        element={(
          <PrivateRoute>
            <DumpHistory />
          </PrivateRoute>
                )}
      />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

export default RoutesWrapper;
