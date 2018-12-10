import * as React from "react";
import { Journal, JournalStore } from "src/apps/journal/models/journal";

interface Provi {
  map: { [key: string]: Journal };
  list: Journal[];
}

export const JournalContext = React.createContext<Provi>({ list: [], map: {} });

interface InterfaceProps {
  userId: string;
  children: React.ReactNode;
}

interface InterfaceState {
  list: Journal[];
  map: { [key: string]: Journal };
}

export class JournalProvider extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private pjs: any;

  constructor(props: any) {
    super(props);

    this.pjs = JournalStore(this.props.userId);

    this.state = {
      list: [],
      map: {}
    };
  }

  public componentDidMount() {
    this.pjs.changes(() =>
      this.setState({
        list: Object.keys(this.pjs.getState().journals).map(
          k => this.pjs.getState().journals[k]
        ),
        map: this.pjs.getState().journals
      })
    );
  }

  public componentWillUnmount() {
    this.pjs.close();
  }

  public render() {
    return (
      <JournalContext.Provider value={this.state}>
        {this.props.children}
      </JournalContext.Provider>
    );
  }
}

interface JournalListProps {
  list: any[];
}

export function withJournalCollection<T extends JournalListProps>(
  Component: React.ComponentType<T>
) {
  function JournalConsumer(props: T) {
    return (
      <JournalContext.Consumer>
        {store => {
          return <Component {...props} list={store.list} />;
        }}
      </JournalContext.Consumer>
    );
  }

  return JournalConsumer;
}

interface JournalProps {
  journalId: string;
  journal?: Journal;
}

export function withJournal<T extends JournalProps>(
  Component: React.ComponentType<T>
) {
  function JournalConsumer(props: T) {
    return (
      <JournalContext.Consumer>
        {store => {
          return <Component {...props} journal={store.map[props.journalId]} />;
        }}
      </JournalContext.Consumer>
    );
  }

  return JournalConsumer;
}
