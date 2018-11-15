import { Record } from "immutable";
import { Doc } from "src/firebase/firestore";
import { LiveStore, Reducer } from './store';

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

export class Todo extends TodoRecord implements ITodo {
  public color: string;
  public completedAt: number | undefined;
  public content: string;
  public createdAt: number;
  public dueAt: number | undefined;
  public id: number;
  public ownerId: string;
  public tags: string[];
  public estimations: number[];

  constructor(props: ITodo) {
    super(props)
  }
}

export const TodoFactory = (doc: Doc): Todo => {
  return new Todo(doc.data() as ITodo);
};

export interface TodoState {
  todos: {[key: string]: string}
}

const reducer: Reducer<TodoState, Action<Todo>> = (state, action) => {
  return state
}

export const TodoStore = new LiveStore(
  "/todo", 
  {},
  TodoFactory, 
  reducer,
)

export interface Action<T> {
  action: string;
  payload: T;
}

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
  }
}

export const Remove = (todo: Todo): Action<Todo> => {
  return {
    action: "@todo/remove", 
    payload: todo
  }
}