import { lazy } from 'react';
import { IRoute } from './types';

const Home = lazy(() => import('../pages/Home'));
const Users = lazy(() => import('../pages/Users/List'));
const Actions = lazy(() => import('../pages/Users/Actions'));
const Signup = lazy(() => import('../pages/Authentication/Signup'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const ForgotPassword = lazy(() => import('../pages/Authentication/ForgotPassword'));
const UpdateProfile = lazy(() => import('../pages/Authentication/UpdateProfile'));
const Error = lazy(() => import('../pages/Error'));

export const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/funcionarios',
    component: Users,
  },
  {
    path: '/funcionarios/acao/:id?',
    component: Actions,
  },
  {
    path: '/perfil',
    component: UpdateProfile,
  },
  {
    path: '/criar-conta',
    component: Signup,
    public: true,
  },
  {
    path: '/recuperar-senha',
    component: ForgotPassword,
    public: true,
  },
  {
    path: '/login',
    component: Login,
    public: true,
  },
  {
    path: '*',
    component: Error,
    public: true,
  },
];
