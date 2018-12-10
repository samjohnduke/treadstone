import * as firebase from "firebase";
import { Record } from "immutable";
import { firestore } from "src/firebase/firebase";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action, LiveStore, Reducer } from "../../../models/collection";

export interface IFeed {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  url: string;
  tags: string[];
  path: string;
  itemCount: number;
}

export const FeedRecord = Record({
  createdAt: Date.now(),
  itemCount: 0,
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

export class Feed extends FeedRecord implements IFeed, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public name: string;
  public createdAt: firebase.firestore.Timestamp;
  public url: string;
  public tags: string[];
  public path: string;
  public itemCount: number;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IFeed
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

export const FeedFactory = {
  fromFirebase: (doc: Doc): Feed => {
    return new Feed(doc.id, doc.ref, doc.data() as IFeed);
  }
};

export interface FeedState {
  feeds: { [key: string]: Feed };
}

export const reducer: Reducer<FeedState, Action<Feed>> = (state, action) => {
  const nextState = { ...state, feeds: { ...state.feeds } };

  switch (action.action) {
    case ADD_FEED:
      nextState.feeds[action.payload.key] = action.payload;
      break;

    case MODIFY_FEED:
      nextState.feeds[action.payload.key] = action.payload;
      break;

    case REMOVE_FEED:
      delete nextState.feeds[action.payload.key];
      break;

    default:
      return state;
  }

  return nextState;
};

export const FeedActionCreator: ActionCreator<Feed, Action<Feed>> = {
  added: (doc: Feed) => Add(doc),
  modified: (doc: Feed) => Modify(doc),
  removed: (doc: Feed) => Remove(doc)
};

const ADD_FEED = "@feed/add";
const MODIFY_FEED = "@feed/modify";
const REMOVE_FEED = "@feed/remove";

export const Add = (feed: Feed): Action<Feed> => {
  return {
    action: ADD_FEED,
    payload: feed
  };
};

export const Modify = (todo: Feed): Action<Feed> => {
  return {
    action: MODIFY_FEED,
    payload: todo
  };
};

export const Remove = (todo: Feed): Action<Feed> => {
  return {
    action: REMOVE_FEED,
    payload: todo
  };
};

export const FeedStore = (userId: string) =>
  new LiveStore(
    firestore
      .collection("users")
      .doc(userId)
      .collection("feeds"), // collection to listen on
    { feeds: {} }, // initial state of todos
    FeedFactory, // how to make a todo from a firebase doc
    FeedActionCreator, // how to create update actions
    reducer // how to change the state from A => B
  );
