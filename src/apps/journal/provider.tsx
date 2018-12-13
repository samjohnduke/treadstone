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

export function withJournalProvider<T>(Component: React.ComponentType<T>) {
  class WithJournalProvider extends React.Component<
    T & InterfaceProps,
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
      if (this.props.userId && !this.subscription) {
        this.subscription = JournalCollection(this.props.userId).subscribe(
          list => {
            return this.setState({ list });
          }
        );
      }
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
  return WithJournalProvider;
}
