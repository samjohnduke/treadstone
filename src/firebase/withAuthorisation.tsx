import { navigate } from "@reach/router";
import * as React from "react";
import { firebase } from "../firebase";
import { AuthUserContext } from "./context";

import * as fb from "firebase";

interface UserProps {
  user?: fb.User | null;
}

type Condition = (user: fb.User | null) => boolean;

export function withAuthorization<T>(condition: Condition, route: string) {
  function WithAuth(Component: React.ComponentType<UserProps>) {
    class WithAuthorization extends React.Component<T, {}> {
      public componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            navigate(route);
          }
        });
      }

      public render() {
        return (
          <AuthUserContext.Consumer>
            {authUser => <Component {...this.props} user={authUser} />}
          </AuthUserContext.Consumer>
        );
      }
    }

    return WithAuthorization;
  }

  return WithAuth;
}
