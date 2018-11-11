import * as React from "react";
import { AuthUserContext } from "./context";

import * as fb from 'firebase'

export interface UserProps {
  user?: fb.User | null
}

export function withUser<T>(Component: React.ComponentType<T & UserProps>) {
  const WithUser = (props: T) => {
    return (
      <AuthUserContext.Consumer>
        {authUser => <Component {...props}  user={authUser} />}
      </AuthUserContext.Consumer>
    );
  }

  return WithUser
};