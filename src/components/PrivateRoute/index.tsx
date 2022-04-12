import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type IPrivateRoute = {
  component: React.FunctionComponent<RouteComponentProps>;
} & RouteProps;

export default function PrivateRoute({ component: Component, ...rest }: IPrivateRoute): React.ReactElement {
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect to="/login" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
