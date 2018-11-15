import { Record } from "immutable";
import { Collection, Doc } from "src/firebase/firestore";

export interface Todo {
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

export const TodoInstance = Record<Todo>({
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

export type TodoRecord = Record<Todo>;

export const TodoFactory = (doc: Doc): TodoRecord => {
  return new TodoInstance(doc.data());
};

export const TodoCollection = new Collection<TodoRecord>("/todos", TodoFactory);

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
