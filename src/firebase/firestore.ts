import { firestore } from "./firebase";

export interface CollectionCallbacks<T> {
  added?(doc: T): void;
  modified?(doc: T): void;
  removed?(doc: T): void;
}

export type Factory<T> = (doc: Doc) => T;

export type Doc = firebase.firestore.QueryDocumentSnapshot;

export interface Ref {
  key: string;
}

export interface ActionCreator<T, A> {
  added: (doc: T) => A;
  modified: (doc: T) => A;
  removed: (doc: T) => A;
}

export class LiveCollection<T extends Ref> {
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
    return firestore.collection(this.path).add(doc);
  }

  public modify(doc: T, fields: string[]) {
    return firestore.collection(this.path).doc(doc.key);
  }

  public remove(doc: T) {
    return firestore
      .collection(this.path)
      .doc(doc.key)
      .delete();
  }

  public close() {
    this.subscription();
  }

  public listen() {
    this.subscription = firestore
      .collection("/users")
      .doc("BMRvH9myrxZdrRQd82HmlJIriJy1")
      .collection(this.path)
      .onSnapshot(snapshot => {
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
