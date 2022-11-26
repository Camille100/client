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
import Account from '../Account';
// import Blocked from '../Blocked';
import Dump from '../Dump';
import Event from '../Event';
import DumpHistory from '../DumpHistory';
import AdminDumps from '../Admin/Dumps';
import AdminValidateCleaning from '../Admin/ValidateCleaning';
import AdminEvents from '../Admin/Events';
import AdminEquipments from '../Admin/Equipments';
import AdminInvites from '../Admin/Invites';
import AdminNotifications from '../Admin/Notifications';
import AdminUsers from '../Admin/Users';

const PrivateRoute = ({ children }) => {
  const isUserAuthenticated = useSelector((state) => state.user.loggedIn);
  return isUserAuthenticated ? children : <Navigate to="/login" />;
};
const PrivateRouteAdmin = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user.loggedIn && user.role === 'admin' ? children : <Navigate to="/login" />;
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
        path="/myaccount"
        element={(
          <PrivateRoute>
            <Account />
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
        path="/event/:eventId"
        element={(
          <PrivateRoute>
            <Event />
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
      <Route
        path="/admin/dumps"
        element={(
          <PrivateRouteAdmin>
            <AdminDumps />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/dumps/validatecleaning"
        element={(
          <PrivateRouteAdmin>
            <AdminValidateCleaning />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/events"
        element={(
          <PrivateRouteAdmin>
            <AdminEvents />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/equipments"
        element={(
          <PrivateRouteAdmin>
            <AdminEquipments />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/notifications"
        element={(
          <PrivateRouteAdmin>
            <AdminNotifications />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/invites"
        element={(
          <PrivateRouteAdmin>
            <AdminInvites />
          </PrivateRouteAdmin>
                )}
      />
      <Route
        path="/admin/users"
        element={(
          <PrivateRouteAdmin>
            <AdminUsers />
          </PrivateRouteAdmin>
                )}
      />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

export default RoutesWrapper;
