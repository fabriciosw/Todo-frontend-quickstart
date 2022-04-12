import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../contexts/AuthContext';
import { routes } from './routes';

// components;
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Loader from '../components/Loader';

const Routes: React.FunctionComponent = () => {
  const { currentUser } = useAuth();

  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => {
      if (route.public) {
        return <Route key={route.path} {...route} exact />;
      }
      return <PrivateRoute key={route.path} {...route} exact />;
    });

  return (
    <div className="d-flex">
      {currentUser && <Sidebar />}
      <div className="d-flex flex-column p-0 w-100">
        <main>
          {currentUser && <Header />}
          <Container fluid>
            <React.Suspense fallback={<Loader />}>
              <Switch>{renderRoutes()}</Switch>
            </React.Suspense>
          </Container>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
