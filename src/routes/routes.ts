import { lazy } from 'react';
import { IRoute } from './types';

// const Login = lazy(() => import("../pages/Login"));
const ToDo = lazy(() => import('../pages/ToDo'));

export const routes: IRoute[] = [
  // {
  //   path: "/login",
  //   element: Login,
  // },
  {
    path: '/todo',
    element: ToDo,
  },
  // {
  //   path: '/funcionarios/acao/:id?',
  //   component: Actions,
  // },
  // {
  //   path: '*',
  //   component: Error,
  //   public: true,
  // },
];
