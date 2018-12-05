import * as firebase from "firebase";
import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action,  Reducer } from "../../../models/store";

export interface IFeedItem {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  url: string;
  tags: string[];
  path: string;
}

export const FeedItemRecord = Record({
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

export class FeedItem extends FeedItemRecord implements IFeedItem, Ref {
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
    props: IFeedItem
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

export const FeedItemFactory = {
  fromFirebase: (doc: Doc): FeedItem => {
    return new FeedItem(doc.id, doc.ref, doc.data() as IFeedItem);
  }
}

export interface FeedItemState {
  feedItems: { [key: string]: FeedItem };
}

export const reducer: Reducer<FeedItemState, Action<FeedItem>> = (
  state,
  action
) => {
  const nextState = { ...state, feedItems: { ...state.feedItems } };

  switch (action.action) {
    case ADD_FEED_ITEM:
      nextState.feedItems[action.payload.key] = action.payload;
      break;

    case MODIFY_FEED_ITEM:
      nextState.feedItems[action.payload.key] = action.payload;
      break;

    case REMOVE_FEED_ITEM:
      delete nextState.feedItems[action.payload.key];
      break;

    default:
      return state;
  }

  return nextState;
};

export const FeedItemActionCreator: ActionCreator<
  FeedItem,
  Action<FeedItem>
> = {
  added: (doc: FeedItem) => Add(doc),
  modified: (doc: FeedItem) => Modify(doc),
  removed: (doc: FeedItem) => Remove(doc)
};

const ADD_FEED_ITEM = "@feedItem/add";
const MODIFY_FEED_ITEM = "@feedItem/modify";
const REMOVE_FEED_ITEM = "@feedItem/remove";

export const Add = (feedItem: FeedItem): Action<FeedItem> => {
  return {
    action: ADD_FEED_ITEM,
    payload: feedItem
  };
};

export const Modify = (todo: FeedItem): Action<FeedItem> => {
  return {
    action: MODIFY_FEED_ITEM,
    payload: todo
  };
};

export const Remove = (todo: FeedItem): Action<FeedItem> => {
  return {
    action: REMOVE_FEED_ITEM,
    payload: todo
  };
};

// export const FeedItemStore = new LiveStore(
//   "/feedItems", // collection to listen on
//   { feedItems: {} }, // initial state of todos
//   FeedItemFactory, // how to make a todo from a firebase doc
//   FeedItemActionCreator, // how to create update actions
//   reducer // how to change the state from A => B
// );
