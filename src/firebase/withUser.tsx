import * as React from "react";
import { AuthUserContext } from "./context";

import { User } from "firebase/app";

export interface UserProps {
  user?: User | null;
}

export function withUser<T>(Component: React.ComponentType<T & UserProps>) {
  const WithUser = (props: T) => {
    return (
      <AuthUserContext.Consumer>
        {authUser => <Component {...props} user={authUser} />}
      </AuthUserContext.Consumer>
    );
  };

  return WithUser;
}
