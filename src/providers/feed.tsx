import * as React from "react";
import { Feed, FeedStore } from "src/apps/reader/models/feed";

interface Provi {
  map: { [key: string]: Feed };
  list: Feed[];
}

export const FeedContext = React.createContext<Provi>({ list: [], map: {} });

interface InterfaceProps {
  children: React.ReactNode;
}

interface InterfaceState {
  list: Feed[];
  map: { [key: string]: Feed };
}

export class FeedProvider extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private pjs: typeof FeedStore;

  constructor(props: any) {
    super(props);

    this.pjs = FeedStore;

    this.state = {
      list: [],
      map: {}
    };
  }

  public componentDidMount() {
    this.pjs.changes(() =>
      this.setState({
        list: Object.keys(this.pjs.getState().feeds).map(
          k => this.pjs.getState().feeds[k]
        ),
        map: this.pjs.getState().feeds
      })
    );
  }

  public componentWillUnmount() {
    this.pjs.close();
  }

  public render() {
    return (
      <FeedContext.Provider value={this.state}>
        {this.props.children}
      </FeedContext.Provider>
    );
  }
}

interface FeedListProps {
  list: any[];
}

export function withFeedCollection<T extends FeedListProps>(
  Component: React.ComponentType<T>
) {
  function FeedConsumer(props: T) {
    return (
      <FeedContext.Consumer>
        {store => {
          return <Component {...props} list={store.list} />;
        }}
      </FeedContext.Consumer>
    );
  }

  return FeedConsumer;
}

interface FeedProps {
  feedId: string;
  feed?: Feed;
}

export function withFeed<T extends FeedProps>(
  Component: React.ComponentType<T>
) {
  function FeedConsumer(props: T) {
    return (
      <FeedContext.Consumer>
        {store => {
          return <Component {...props} feed={store.map[props.feedId]} />;
        }}
      </FeedContext.Consumer>
    );
  }

  return FeedConsumer;
}
