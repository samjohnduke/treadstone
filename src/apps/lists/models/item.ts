import { Record } from "immutable";
import { collection } from "rxfire/firestore/";
import { map } from "rxjs/operators";
import { firestore } from "src/firebase/firebase";
import { Doc, Ref } from "src/firebase/firestore";

export interface IListItem {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  completedAt: firebase.firestore.Timestamp;
  listId: string;
}

export const ListItemRecord = Record({
  archived: false,
  createdAt: Date.now(),
  items: [],
  name: ""
});

export class ListItem extends ListItemRecord implements IListItem, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public readonly content: string;
  public readonly createdAt: firebase.firestore.Timestamp;
  public readonly completedAt: firebase.firestore.Timestamp;
  public readonly listId: string;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IListItem
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }
}

export const ListItemFactory = {
  fromFirebase: (doc: Doc): ListItem => {
    return new ListItem(doc.id, doc.ref, doc.data() as IListItem);
  }
};

export function ListItemCollection(userId: string, listId: string) {
  const liRef = firestore
    .collection("users")
    .doc(userId)
    .collection("listItems");

  const ref = liRef.where("listId", "==", listId).orderBy("orderId", "desc");

  const col = collection(ref).pipe(
    map(items => items.map(i => ListItemFactory.fromFirebase(i)))
  );

  return {
    collection: col,
    ref: liRef
  };
}
