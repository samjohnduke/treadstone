import * as React from "react";
import { Subscription } from "rxjs";
import { ListContext } from "./context";
import { List, ListCollection } from "./models/list";

interface InterfaceProps {
  userId: string;
  list?: List[];
}

interface InterfaceState {
  list: List[];
}

export function withListProvider<T>(Component: React.ComponentType<T>) {
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
        this.subscription = ListCollection(this.props.userId).subscribe(
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
        <ListContext.Provider value={list}>
          <Component {...this.props} />
        </ListContext.Provider>
      );
    }
  }
  return WithJournalProvider;
}
