import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import authRoutes from './AuthRoutes';
import LayoutRoutes from './LayoutRoutes';
import DotLoading from '../components/loading/DotLoading';
// setup fake backend

function Routers() {
  const isLoggedIn = useSelector((state) => state.user.user);
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<DotLoading />}>
        <Routes>
          <Route path="" element={<PrivateRoute />}>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}
            <Route path="/*" element={<LayoutRoutes />} />
          </Route>
          {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
