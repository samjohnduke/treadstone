import * as React from "react";
import "./App.css";

import { Router } from "@reach/router";

import { AboutPage } from "./pages/about";
import { AuthPage } from "./pages/auth";
import { CorePage } from "./pages/core";
import { HomePage } from "./pages/home";
import { PricingPage } from "./pages/pricing";
import { RegisterPage } from "./pages/register";

import * as Routes from "./constants/routes";
import { withAuthentication } from "./firebase/withAuthentication";
import { ForgotPasswordPage } from "./pages/forgotPassword";

class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <Router>
          <AuthPage path={Routes.AUTHENTICATE} />
          <RegisterPage path={Routes.REGISTER} />
          <ForgotPasswordPage path={Routes.FORGOTTEN_PASSWORD} />
          <AboutPage path={Routes.ABOUT} />
          <PricingPage path={Routes.PRICING} />
          <CorePage path={Routes.APP} />
          <HomePage path={Routes.HOME} />
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
