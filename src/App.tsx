import * as React from "react";
import "./App.css";

import { Router } from "@reach/router";

import { AboutPage } from "./pages/about";
import { AuthPage } from "./pages/auth";
import { HomePage } from "./pages/home";
import { PricingPage } from "./pages/pricing";
import { RegisterPage } from "./pages/register";

import * as Routes from "./constants/routes";
import { withAuthentication } from "./firebase/withAuthentication";
import { ForgotPasswordPage } from "./pages/forgotPassword";

import "src/models/todo";
import { ThemeProvider } from "./styled";
import { DefaultTheme } from "./theme";

const CorePage = React.lazy(() => import("./pages/core"));

class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <ThemeProvider theme={DefaultTheme}>
          <React.Suspense fallback={<div />}>
            <Router>
              <AuthPage path={Routes.AUTHENTICATE} />
              <RegisterPage path={Routes.REGISTER} />
              <ForgotPasswordPage path={Routes.FORGOTTEN_PASSWORD} />
              <AboutPage path={Routes.ABOUT} />
              <PricingPage path={Routes.PRICING} />
              <CorePage path={`${Routes.APP}/*`} />
              <HomePage path={Routes.HOME} />
            </Router>
          </React.Suspense>
        </ThemeProvider>
      </div>
    );
  }
}

export default withAuthentication(App);
