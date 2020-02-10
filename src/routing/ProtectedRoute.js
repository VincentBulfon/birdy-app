import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {value => {
          const { isLogged } = value;
          return (
            <Route
              {...rest}
              render={ (props)  =>
                isLogged ? (
                  <Component {...props}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          );
        }}
    </AuthContext.Consumer>
  );
};

export default ProtectedRoute;
