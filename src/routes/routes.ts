import { lazy } from 'react';
import { IRoute } from './types';

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
    path: '/funcionarios/criar',
    component: Create,
  },
  {
    path: '/funcionarios/:id',
    component: Update,
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
