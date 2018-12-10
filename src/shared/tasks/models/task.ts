import { firestore } from "firebase";
import { Record } from "immutable";
import { firestore as FS } from "src/firebase/firebase";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action, LiveStore, Reducer } from "../../../models/collection";

export interface ITask {
  name: string;
  tags: string[];
  description: string;
  labels: string[];
  checklist: string[];
  comments: [];
  dueDate: firestore.Timestamp;
  estimate: number;
  project: string;
}

export const TaskRecord = Record({
  checklist: [],
  comments: [],
  completedAt: firestore.Timestamp.now(),
  description: "",
  dueDate: firestore.Timestamp.now(),
  estimate: 1,
  labels: [],
  name: "",
  project: "",
  tags: []
});

export class Task extends TaskRecord implements ITask, Ref {
  public key: string | undefined;
  public ref: firebase.firestore.DocumentReference | undefined;
  public name: string;
  public tags: string[];
  public description: string;
  public labels: string[];
  public checklist: string[];
  public comments: [];
  public dueDate: firestore.Timestamp;
  public estimate: number;
  public project: string;

  constructor(
    key: string | undefined,
    ref: firebase.firestore.DocumentReference | undefined,
    props: ITask
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }

  public async create() {
    return new Promise(resolve => {
      resolve("created");
    });
  }
}

export const TaskFactory = {
  fromFirebase: (doc: Doc): Task => {
    return new Task(doc.id, doc.ref, doc.data() as ITask);
  },
  fromRef: async (doc: firestore.DocumentReference): Promise<Task> => {
    const data = await doc.get();
    return new Task(data.id, data.ref, data.data() as ITask);
  },
  newFromJS: async (doc: ITask): Promise<Task> => {
    const task = new Task(undefined, undefined, doc);
    await task.create();
    return task;
  }
};

export interface TaskState {
  tasks: { [key: string]: Task };
}

export const reducer: Reducer<TaskState, Action<Task>> = (state, action) => {
  const nextState = { ...state, tasks: { ...state.tasks } };

  switch (action.action) {
    case ADD_TASK:
      nextState.tasks[action.payload.key!] = action.payload;
      break;

    case MODIFY_TASK:
      nextState.tasks[action.payload.key!] = action.payload;
      break;

    case REMOVE_TASK:
      delete nextState.tasks[action.payload.key!];
      break;

    default:
      return state;
  }

  return nextState;
};

export const TaskActionCreator: ActionCreator<Task, Action<Task>> = {
  added: (doc: Task) => Add(doc),
  modified: (doc: Task) => Modify(doc),
  removed: (doc: Task) => Remove(doc)
};

const ADD_TASK = "@task/add";
const MODIFY_TASK = "@task/modify";
const REMOVE_TASK = "@task/remove";

export const Add = (todo: Task): Action<Task> => {
  return {
    action: ADD_TASK,
    payload: todo
  };
};

export const Modify = (todo: Task): Action<Task> => {
  return {
    action: MODIFY_TASK,
    payload: todo
  };
};

export const Remove = (todo: Task): Action<Task> => {
  return {
    action: REMOVE_TASK,
    payload: todo
  };
};

export const TaskStore = (userId: string) =>
  new LiveStore(
    FS.collection("users")
      .doc(userId)
      .collection("tasks"), // collection to listen on
    { tasks: {} }, // initial state of todos
    TaskFactory, // how to make a todo from a firebase doc
    TaskActionCreator, // how to create update actions
    reducer // how to change the state from A => B
  );
