import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IPrivateRoute } from './types';

export default function PrivateRoute({ component: Component, ...rest }: IPrivateRoute): React.ReactElement {
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect to="/login" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
