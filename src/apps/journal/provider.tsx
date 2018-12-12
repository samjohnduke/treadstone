import * as React from "react";
import { Subscription } from "rxjs";
import { JournalContext } from "./context";
import { Journal, JournalCollection } from "./models/journal";

interface InterfaceProps {
  userId: string;
  list?: Journal[];
}

interface InterfaceState {
  list: Journal[];
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<
    InterfaceProps,
    InterfaceState
  > {
    private subscription: Subscription;

    constructor(props: any) {
      super(props);

      this.state = {
        list: []
      };
    }

    public componentDidMount = () => {
      this.subscription = JournalCollection(this.props.userId).subscribe(list =>
        this.setState({ list })
      );
    };

    public componentWillUnmount = () => {
      this.subscription.unsubscribe();
    };
    public render() {
      const { list } = this.state;

      return (
        <JournalContext.Provider value={list}>
          <Component />
        </JournalContext.Provider>
      );
    }
  }
  return WithAuthentication;
};
