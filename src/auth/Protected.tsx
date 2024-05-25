// src/components/ProtectedRoute.tsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: React.FC;
  isAuthenticated: boolean;
  [key: string]: any;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
