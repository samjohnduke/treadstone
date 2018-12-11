export interface CollectionCallbacks<T> {
  added?(doc: T): void;
  modified?(doc: T): void;
  removed?(doc: T): void;
}

export interface Factory<T, Inter> {
  fromFirebase?(doc: Doc): T;
  newFromJS?(doc: Inter): Promise<T>;
  fromRef?(doc: firebase.firestore.DocumentReference): Promise<T>;
}

export type Doc = firebase.firestore.DocumentSnapshot;

export interface Ref {
  key?: string;
}

export interface ActionCreator<T, A> {
  added: (doc: T) => A;
  modified: (doc: T) => A;
  removed: (doc: T) => A;
}

export class LiveCollection<T extends Ref, Inter> {
  private query: firebase.firestore.CollectionReference;
  private callbacks: CollectionCallbacks<T> | undefined;
  private factory: Factory<T, Inter>;
  private subscription: () => void;

  constructor(
    query: firebase.firestore.CollectionReference,
    factory: Factory<T, Inter>,
    callbacks?: CollectionCallbacks<T>
  ) {
    this.query = query;
    this.callbacks = callbacks;
    this.factory = factory;
  }

  public add(doc: T) {
    return this.query.add(doc);
  }

  public modify(doc: T, fields: string[]) {
    return this.query.doc(doc.key);
  }

  public remove(doc: T) {
    return this.query.doc(doc.key).delete();
  }

  public close() {
    this.subscription();
  }

  public listen() {
    this.query.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let added;
        let modified;
        let removed;

        if (this.callbacks) {
          added = this.callbacks.added;
          modified = this.callbacks.modified;
          removed = this.callbacks.removed;
        }

        const doc = this.factory.fromFirebase!(change.doc);

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
