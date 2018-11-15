import { firestore } from "./firebase";

export interface CollectionCallbacks<T> {
  added?(doc: T): void;
  modified?(doc: T): void;
  removed?(doc: T): void;
}

export type Factory<T> = (doc: Doc) => T;

export type Doc = firebase.firestore.QueryDocumentSnapshot;

export class Collection<T> {
  private path: string;
  private callbacks: CollectionCallbacks<T> | undefined;
  private factory: Factory<T>;
  private subscription: () => void;

  constructor(
    path: string,
    factory: Factory<T>,
    callbacks?: CollectionCallbacks<T>
  ) {
    this.path = path;
    this.callbacks = callbacks;
    this.factory = factory;
  }

  public add(doc: T) {
    //
  }

  public modify(doc: T, fields: string[]) {
    //
  }

  public remove(doc: T) {
    //
  }

  public close() {
    this.subscription();
  }

  public listen() {
    this.subscription = firestore.collection(this.path).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let added;
        let modified;
        let removed;

        if (this.callbacks) {
          added = this.callbacks.added;
          modified = this.callbacks.modified;
          removed = this.callbacks.removed;
        }

        const doc = this.factory(change.doc);

        switch (change.type) {
          case "added":
            if (added) {
              added(doc);
            }
            break;
          case "modified":
            if (modified) {
              modified(doc);
            }
            break;
          case "removed":
            if (removed) {
              removed(doc);
            }
            break;
        }
      });
    });
  }
}
