import * as React from "react";

import { LiveDocument } from "src/models/document";
import { User } from "src/models/user";

interface Provi {
  user: User | undefined;
}

export const UserContext = React.createContext<Provi>({ user: undefined });

interface InterfaceProps {
  children: React.ReactNode;
}

export class UserProvider extends React.Component<InterfaceProps, Provi> {
  private us: LiveDocument<{ user: User | undefined }>;

  constructor(props: any) {
    super(props);

    this.us = new LiveDocument({ user: undefined });

    this.state = {
      user: undefined
    };
  }

  public componentDidMount() {
    // this.us.changes(() =>
    //   this.setState({
    //     user: this.us.getState().user
    //   })
    // );
  }

  public componentWillUnmount() {
    this.us.close();
  }

  public render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export function withUser<T extends Provi>(Component: React.ComponentType<T>) {
  function UserConsumer(props: T) {
    return (
      <UserContext.Consumer>
        {store => {
          return <Component {...props} user={store.user} />;
        }}
      </UserContext.Consumer>
    );
  }

  return UserConsumer;
}
