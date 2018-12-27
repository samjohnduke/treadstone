import { Record } from "immutable";
import { firestore } from "src/firebase/firebase";
import { Doc, Ref } from "src/firebase/firestore";

import { collection, doc as DocRefChanges } from "rxfire/firestore";

import { map } from "rxjs/operators";

export interface IList {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  archived: boolean;
}

export const ListRecord = Record({
  archived: false,
  createdAt: Date.now(),
  items: [],
  name: ""
});

export class List extends ListRecord implements IList, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public name: string;
  public createdAt: firebase.firestore.Timestamp;
  public archived: boolean;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IList
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }
}

export const ListFactory = {
  fromFirebase: (doc: Doc): List => {
    return new List(doc.id, doc.ref, doc.data() as IList);
  }
};

export const ListCollection = (userId: string) => {
  const colRef = firestore
    .collection("users")
    .doc(userId)
    .collection("lists");

  const collectionRef = colRef.orderBy("createdAt", "desc");

  const col = collection(collectionRef!).pipe(
    map(js => {
      return js.map((j: any) => ListFactory.fromFirebase(j));
    })
  );

  return {
    collection: col,
    ref: colRef
  };
};

export const ListDocument = (userId: string, documentId: string) => {
  const documentRef = firestore
    .collection("users")
    .doc(userId)
    .collection("lists")
    .doc(documentId);

  return DocRefChanges(documentRef).pipe(
    map(js => {
      return ListFactory.fromFirebase(js);
    })
  );
};
