import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action } from "./collection";

export interface ITodo {
  color: string;
  completedAt: number | undefined;
  content: string;
  createdAt: number;
  dueAt: number | undefined;
  id: number;
  ownerId: string;
  tags: string[];
  estimations: number[];
}

export const TodoRecord = Record({
  color: "white",
  completedAt: undefined,
  content: "",
  createdAt: Date.now(),
  dueAt: undefined,
  estimations: [],
  id: -1,
  ownerId: "",
  tags: ["new"]
});

export class Todo extends TodoRecord implements ITodo, Ref {
  public color: string;
  public completedAt: number | undefined;
  public content: string;
  public createdAt: number;
  public dueAt: number | undefined;
  public id: number;
  public ownerId: string;
  public tags: string[];
  public estimations: number[];
  public key: string;

  constructor(props: ITodo) {
    super(props);
  }
}

export const TodoFactory = {
  fromFirebase: (doc: Doc): Todo => {
    return new Todo(doc.data() as ITodo);
  }
};

export const TodoActionCreator: ActionCreator<Todo, Action<Todo>> = {
  added: (doc: Todo) => Add(doc),
  modified: (doc: Todo) => Modify(doc),
  removed: (doc: Todo) => Remove(doc)
};

export interface TodoState {
  todos: { [key: string]: string };
}

// const reducer: Reducer<TodoState, Action<Todo>> = (state, action) => {
//   return state;
// };

export const Add = (todo: Todo): Action<Todo> => {
  return {
    action: "@todo/add",
    payload: todo
  };
};

export const Modify = (todo: Todo): Action<Todo> => {
  return {
    action: "@todo/modify",
    payload: todo
  };
};

export const Remove = (todo: Todo): Action<Todo> => {
  return {
    action: "@todo/remove",
    payload: todo
  };
};

// export const TodoStore = new LiveStore(
//   "/todo", // collection to listen on
//   {}, // initial state of todos
//   TodoFactory, // how to make a todo from a firebase doc
//   TodoActionCreator, // how to create update actions
//   reducer // how to change the state from A => B
// );
