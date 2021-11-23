import React from 'react';
import { RouteProps } from 'react-router-dom';

export type IPrivateRoute = {
  component: React.FunctionComponent;
} & RouteProps;
