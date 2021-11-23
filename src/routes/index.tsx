import React, { lazy, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PrivateRoute from '../components/PrivateRoute';
import { IRoute } from './interfaces';

// components;
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useAuth } from '../contexts/AuthContext';

// Pages;
const Home = lazy(() => import('../pages/Home'));
const Users = lazy(() => import('../pages/Users/List'));
const Create = lazy(() => import('../pages/Users/Create'));
const Update = lazy(() => import('../pages/Users/Update'));
const Signup = lazy(() => import('../pages/Authentication/Signup'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const ForgotPassword = lazy(() => import('../pages/Authentication/ForgotPassword'));
const UpdateProfile = lazy(() => import('../pages/Authentication/UpdateProfile'));
const Error = lazy(() => import('../pages/Error'));

const DEFAULT_TITLE = 'Backoffice | ';

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
    title: `${DEFAULT_TITLE} Página inicial`,
  },
  {
    path: '/funcionarios',
    component: Users,
    title: `${DEFAULT_TITLE} Gerenciar funcionários`,
  },
  {
    path: '/criar-funcionario',
    component: Create,
    title: `${DEFAULT_TITLE} Criar novo funcionário`,
  },
  {
    path: '/editar-funcionario/:id',
    component: Update,
    title: `${DEFAULT_TITLE} Editar funcionário`,
  },
  {
    path: '/perfil',
    component: UpdateProfile,
    title: `${DEFAULT_TITLE} Perfil`,
  },
  {
    path: '/criar-conta',
    component: Signup,
    public: true,
    title: `${DEFAULT_TITLE} Criar conta`,
  },
  {
    path: '/recuperar-senha',
    component: ForgotPassword,
    public: true,
    title: `${DEFAULT_TITLE} Recuperar conta`,
  },
  {
    path: '/login',
    component: Login,
    public: true,
    title: `${DEFAULT_TITLE} Login`,
  },
  {
    path: '*',
    component: Error,
    public: true,
    title: `${DEFAULT_TITLE} Página não encontrada`,
  },
];

const Routes: React.FunctionComponent = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const currentTitle = routes.find((route) => route.path === location.pathname);

    if (currentTitle) {
      document.title = currentTitle.title;
    }
  }, [location]);

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

export default Routes;
