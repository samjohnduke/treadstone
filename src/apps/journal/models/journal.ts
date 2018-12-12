import * as firebase from "firebase";
import { Record } from "immutable";
import { firestore } from "src/firebase/firebase";
import { Doc, Ref } from "src/firebase/firestore";

import { collection, doc as DocRefChanges } from "rxfire/firestore";

import { map } from "rxjs/operators";

export interface IJournal {
  title: string;
  createdAt: firebase.firestore.Timestamp;
  editedAt: firebase.firestore.Timestamp | undefined;
  publishedAt: firebase.firestore.Timestamp | undefined;
  content: string;
  tags: string[];
}

export const JournalRecord = Record({
  content: "",
  createdAt: Date.now(),
  editedAt: undefined,
  publishedAt: undefined,
  tags: [],
  title: ""
});

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export class Journal extends JournalRecord implements IJournal, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public title: string;
  public createdAt: firebase.firestore.Timestamp;
  public editedAt: firebase.firestore.Timestamp | undefined;
  public publishedAt: firebase.firestore.Timestamp | undefined;
  public content: string;
  public tags: string[];

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IJournal
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }

  public createdAtDate() {
    const date = new Date(this.createdAt.seconds * 1000);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;
  }
}

export const JournalFactory = {
  fromFirebase: (doc: Doc): Journal => {
    return new Journal(doc.id, doc.ref, doc.data() as IJournal);
  }
};

export const JournalCollection = (userId: string) => {
  const collectionRef = firestore
    .collection("users")
    .doc(userId)
    .collection("journal")
    .orderBy("createdAt", "desc");

  return collection(collectionRef!).pipe(
    map(js => {
      return js.map((j: any) => JournalFactory.fromFirebase(j));
    })
  );
};

export const JournalDocument = (userId: string, documentId: string) => {
  const documentRef = firestore
    .collection("users")
    .doc(userId)
    .collection("journal")
    .doc(documentId);

  return DocRefChanges(documentRef).pipe(
    map(js => {
      return JournalFactory.fromFirebase(js);
    })
  );
};
