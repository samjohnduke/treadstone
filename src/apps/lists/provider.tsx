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
    private ref: firebase.firestore.CollectionReference;

    constructor(props: any) {
      super(props);

      this.state = {
        list: []
      };
    }

    public componentDidMount = () => {
      const listRef = ListCollection(this.props.userId);
      this.ref = listRef.ref;

      if (this.props.userId && !this.subscription) {
        this.subscription = listRef.collection.subscribe(list => {
          return this.setState({ list });
        });
      }
    };

    public componentWillUnmount = () => {
      this.subscription.unsubscribe();
    };

    public render() {
      return (
        <ListContext.Provider value={this.provider()}>
          <Component {...this.props} />
        </ListContext.Provider>
      );
    }

    private provider = () => {
      const { list } = this.state;

      return {
        all: list,
        create: this.createList,
        delete: console.log,
        update: console.log
      };
    };

    private createList = async (name: string) => {
      const ref = await this.ref.add({
        archived: false,
        createdAt: Date.now(),
        name
      });

      return ref.id;
    };
  }
  return WithJournalProvider;
}
