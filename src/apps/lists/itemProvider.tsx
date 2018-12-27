import * as React from "react";
import { Subscription } from "rxjs";
import { ListItemContext } from "./context";
import { ListItem, ListItemCollection } from "./models/item";

interface InterfaceProps {
  userId: string;
  listId: string;
  items?: ListItem[];
}

interface InterfaceState {
  items: ListItem[];
}

export function withItemProvider<T>(Component: React.ComponentType<T>) {
  class WithItemProvider extends React.Component<
    T & InterfaceProps,
    InterfaceState
  > {
    private subscription: Subscription;
    private ref: firebase.firestore.CollectionReference;

    constructor(props: any) {
      super(props);

      this.state = {
        items: []
      };
    }

    public componentDidMount() {
      const { collection, ref } = ListItemCollection(
        this.props.userId,
        this.props.listId
      );

      this.ref = ref;

      if (!this.subscription) {
        this.subscription = collection.subscribe(items => {
          this.setState({ items });
        });
      }
    }

    public componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    public render() {
      return (
        <ListItemContext.Provider value={this.provider()}>
          <Component {...this.props} />
        </ListItemContext.Provider>
      );
    }

    private provider = () => {
      const { items } = this.state;

      return {
        all: items,
        create: this.createItem,
        delete: console.log,
        update: console.log
      };
    };

    private createItem = async (content: string, order: number) => {
      const ref = await this.ref.add({
        completed: null,
        content,
        createdAt: Date.now(),
        order
      });

      return ref.id;
    };
  }

  return WithItemProvider;
}
