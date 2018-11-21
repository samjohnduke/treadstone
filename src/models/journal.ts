import * as firebase from "firebase";
import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action, LiveStore, Reducer } from "./store";

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

export const JournalFactory = (doc: Doc): Journal => {
  return new Journal(doc.id, doc.ref, doc.data() as IJournal);
};

export interface JournalState {
  journals: { [key: string]: Journal };
}

export const reducer: Reducer<JournalState, Action<Journal>> = (
  state,
  action
) => {
  const nextState = { ...state };

  switch (action.action) {
    case ADD_JOURNAL:
      nextState.journals[action.payload.key] = action.payload;
      break;

    case MODIFY_JOURNAL:
      nextState.journals[action.payload.key] = action.payload;
      break;

    case REMOVE_JOURNAL:
      delete nextState.journals[action.payload.key];
      break;

    default:
      return state;
  }

  return nextState;
};

export const JournalActionCreator: ActionCreator<Journal, Action<Journal>> = {
  added: (doc: Journal) => Add(doc),
  modified: (doc: Journal) => Modify(doc),
  removed: (doc: Journal) => Remove(doc)
};

const ADD_JOURNAL = "@journal/add";
const MODIFY_JOURNAL = "@journal/modify";
const REMOVE_JOURNAL = "@journal/remove";

export const Add = (todo: Journal): Action<Journal> => {
  return {
    action: ADD_JOURNAL,
    payload: todo
  };
};

export const Modify = (todo: Journal): Action<Journal> => {
  return {
    action: MODIFY_JOURNAL,
    payload: todo
  };
};

export const Remove = (todo: Journal): Action<Journal> => {
  return {
    action: REMOVE_JOURNAL,
    payload: todo
  };
};

export const JournalStore = new LiveStore(
  "/journal", // collection to listen on
  { journals: {} }, // initial state of todos
  JournalFactory, // how to make a todo from a firebase doc
  JournalActionCreator, // how to create update actions
  reducer // how to change the state from A => B
);
