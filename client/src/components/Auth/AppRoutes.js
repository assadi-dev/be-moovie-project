import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkToken } from "../../services/Auth.sevices";

import { useAuthState } from "../../utils/context/AuthContext";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  checkToken();

  return (
    <Route
      path={path}
      exact
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
