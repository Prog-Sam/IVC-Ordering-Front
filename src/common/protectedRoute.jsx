import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { blacklisted, whitelisted } from '../utils/protector';

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  inclusion = [],
  exclusion = [],
  ...rest
}) => {
  const isAuthorized = (curUser, inc = [], exc = []) => {
    console.log(inc);
    console.log(curUser.access);
    console.log(whitelisted(inc, curUser));
    if (!curUser) return false;
    if (inc) return whitelisted(inc, curUser) ? true : false;
    if (exc) return blacklisted(inc, curUser) ? false : true;
    return true;
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthorized(getCurrentUser(), inclusion, exclusion))
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
