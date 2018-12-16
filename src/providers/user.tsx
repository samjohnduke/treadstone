import * as React from "react";

import { doc } from "rxfire/firestore";
import { Subscription } from "rxjs";
import { firestore } from "src/firebase/firebase";
import { User } from "src/models/user";

interface Provi {
  user: User | undefined;
}

export const UserContext = React.createContext<Provi>({ user: undefined });

interface InterfaceProps {
  userId: string;
  children: React.ReactNode;
}

export class UserProvider extends React.Component<InterfaceProps, Provi> {
  public state: Provi;
  private sub: Subscription;

  constructor(props: any) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  public componentDidMount() {
    const documentRef = firestore.collection("users").doc(this.props.userId);

    this.sub = doc(documentRef).subscribe(u => {
      const user = new User(u.id, u.ref, u.data() as any);
      this.setState({ user });
    });
  }

  public componentWillUnmount() {
    this.sub.unsubscribe();
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
