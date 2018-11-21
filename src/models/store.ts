import {
  ActionCreator,
  Factory,
  LiveCollection,
  Ref
} from "src/firebase/firestore";

export class LiveStore<T extends Ref, State, Act> {
  private collection: LiveCollection<T>;
  private factory: Factory<T>;
  private path: string;
  private store: State;
  private reducer: Reducer<State, Act>;
  private actionCreator: ActionCreator<T, Act>;
  private cb: () => void;

  constructor(
    path: string,
    initialState: State,
    factory: Factory<T>,
    actionCreator: ActionCreator<T, Act>,
    reducer: Reducer<State, Act>
  ) {
    this.path = path;
    this.store = initialState;
    this.factory = factory;
    this.reducer = reducer;
    this.actionCreator = actionCreator;

    this.collection = new LiveCollection<T>(this.path, this.factory, {
      added: this.added,
      modified: this.modified,
      removed: this.removed
    });
  }

  public changes = (cb: () => void) => {
    this.cb = cb;
    this.collection.listen();
  };

  public close = () => {
    this.collection.close();
  };

  public dispatch = (action: Act) => {
    this.store = this.reducer(this.store, action);
    this.cb();
  };

  public getState = () => {
    return this.store;
  };

  public added = (doc: T) => {
    const action = this.actionCreator.added(doc);
    this.dispatch(action);
  };

  public modified = (doc: T) => {
    const action = this.actionCreator.modified(doc);
    this.dispatch(action);
  };

  public removed = (doc: T) => {
    const action = this.actionCreator.removed(doc);
    this.dispatch(action);
  };
}

export type Reducer<T, A> = (store: T, action: A) => T;

export interface Action<T> {
  action: string;
  payload: T;
}
