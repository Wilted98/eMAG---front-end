import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ErrorPage from "../../pages/404/404";

const UserRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => ({ ...state.user }));
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Route {...rest} component={ErrorPage} />
  );
};

export default UserRoute;
