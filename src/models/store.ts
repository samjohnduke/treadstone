import { Factory, LiveCollection } from "src/firebase/firestore";

export class LiveStore<T, State, Action> {
  private collection: LiveCollection<T>;
  private factory: Factory<T>;
  private path: string;
  private store: State;
  private reducer: Reducer<State, Action>;

  constructor(
    path: string,
    initialState: State,
    factory: Factory<T>,
    reducer: Reducer<State, Action>
  ) {
    this.path = path;
    this.store = initialState;
    this.factory = factory;
    this.reducer = reducer;

    this.collection = new LiveCollection<T>(this.path, this.factory, {
      added: this.added,
      modified: this.modified,
      removed: this.removed
    });
  }

  public close = () => {
    this.collection.close();
  };

  public dispatch = (action: Action) => {
    this.store = this.reducer(this.store, action);
  };

  public getState = () => {
    return this.store;
  };

  public added = (doc: T) => {
    //
  };

  public modified = (doc: T) => {
    //
  };

  public removed = (doc: T) => {
    //
  };
}

export type Reducer<T, A> = (store: T, action: A) => T;
