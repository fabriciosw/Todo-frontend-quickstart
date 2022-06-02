import React from 'react';
import { Routes as RoutesRouter, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import * as userServices from '../services/userServices';
import ToDo from '../pages/ToDo';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import Loader from '../components/Loader';
// components;

const Routes: React.FunctionComponent = () => {
  // const renderRoutes = (): React.ReactNode => routes.map((route) => <Route key={route.path} {...route} />);

  const { isAuthenticated } = AuthenticationContext();
  const renderRoutes = (): React.ReactNode => (
    <RoutesRouter>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/todo" replace /> : <Login loginUser={userServices.loginUser} />}
      />
      <Route path="/todo" element={isAuthenticated ? <ToDo /> : <Navigate to="/login" replace />} />
      <Route path="*" element={isAuthenticated ? <ToDo /> : <Navigate to="/login" replace />} />
    </RoutesRouter>
  );

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <React.Suspense fallback={<Loader />}>
            {renderRoutes()}
            {/* <RoutesRouter>{renderRoutes()}</RoutesRouter> */}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
