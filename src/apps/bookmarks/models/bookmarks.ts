import * as firebase from "firebase";
import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action, LiveStore, Reducer } from "../../../models/store";

export interface IBookmark {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  url: string;
  tags: string[];
  path: string;
}

export const BookmarkRecord = Record({
  createdAt: Date.now(),
  name: "",
  tags: [],
  url: ""
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

export class Bookmark extends BookmarkRecord implements IBookmark, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public name: string;
  public createdAt: firebase.firestore.Timestamp;
  public url: string;
  public tags: string[];
  public path: string;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IBookmark
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

export const BookFactory = { 
  fromFirebase: (doc: Doc): Bookmark => {
    return new Bookmark(doc.id, doc.ref, doc.data() as IBookmark);
  }
}

export interface BookmarkState {
  bookmarks: { [key: string]: Bookmark };
}

export const reducer: Reducer<BookmarkState, Action<Bookmark>> = (
  state,
  action
) => {
  const nextState = { ...state, bookmarks: { ...state.bookmarks } };

  switch (action.action) {
    case ADD_BOOKMARK:
      nextState.bookmarks[action.payload.key] = action.payload;
      break;

    case MODIFY_BOOKMARK:
      nextState.bookmarks[action.payload.key] = action.payload;
      break;

    case REMOVE_BOOKMARK:
      delete nextState.bookmarks[action.payload.key];
      break;

    default:
      return state;
  }

  return nextState;
};

export const BookmarkActionCreator: ActionCreator<
  Bookmark,
  Action<Bookmark>
> = {
  added: (doc: Bookmark) => Add(doc),
  modified: (doc: Bookmark) => Modify(doc),
  removed: (doc: Bookmark) => Remove(doc)
};

const ADD_BOOKMARK = "@bookmark/add";
const MODIFY_BOOKMARK = "@bookmark/modify";
const REMOVE_BOOKMARK = "@bookmark/remove";

export const Add = (bookmark: Bookmark): Action<Bookmark> => {
  return {
    action: ADD_BOOKMARK,
    payload: bookmark
  };
};

export const Modify = (todo: Bookmark): Action<Bookmark> => {
  return {
    action: MODIFY_BOOKMARK,
    payload: todo
  };
};

export const Remove = (todo: Bookmark): Action<Bookmark> => {
  return {
    action: REMOVE_BOOKMARK,
    payload: todo
  };
};

export const JournalStore = new LiveStore(
  "/bookmarks", // collection to listen on
  { bookmarks: {} }, // initial state of todos
  BookFactory, // how to make a todo from a firebase doc
  BookmarkActionCreator, // how to create update actions
  reducer // how to change the state from A => B
);
