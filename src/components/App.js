import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import ResetPasswordAdmin from "../pages/resetPasswordAdmin/ResetPasswordAdmin";
import Username from "../pages/username/Username";
import Yourinformation from "../pages/yourinformation/Yourinformation";
import Verifyemail from "../pages/verifyemail/Verifyemail"
import Verify from "../pages/verify/Verify"

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/forgotpassword" component={ForgotPassword}/>
        <PublicRoute path="/changepassword" component={ResetPasswordAdmin}/>
        <PublicRoute path="/username" component={Username}/>
        <PublicRoute path="/yourinformation" component={Yourinformation}/>
        <PublicRoute path="/verifyemail" component={Verifyemail}/>
        <PublicRoute path="/verify" component={Verify}/>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
