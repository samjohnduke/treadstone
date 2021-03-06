import {
  ActionCreator,
  Factory,
  LiveCollection,
  Ref
} from "src/firebase/firestore";

export class LiveStore<T extends Ref, State, Act, Inter> {
  private collection: LiveCollection<T, Inter>;
  private factory: Factory<T, Inter>;
  private store: State;
  private reducer: Reducer<State, Act>;
  private actionCreator: ActionCreator<T, Act>;
  private query: firebase.firestore.CollectionReference;
  private cb: () => void;

  constructor(
    query: firebase.firestore.CollectionReference,
    initialState: State,
    factory: Factory<T, Inter>,
    actionCreator: ActionCreator<T, Act>,
    reducer: Reducer<State, Act>
  ) {
    this.query = query;
    this.store = initialState;
    this.factory = factory;
    this.reducer = reducer;
    this.actionCreator = actionCreator;

    this.collection = new LiveCollection<T, Inter>(
      this.query,
      this.factory,
      this
    );
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
