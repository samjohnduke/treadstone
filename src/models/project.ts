import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { File, FileFactory } from "./file";
import { Action, LiveStore, Reducer } from "./store";
import { Task, TaskFactory } from "./task";

export interface IProject {
  name: string;
  tags: string[];
  description: string;
  tasks: Task[] | Array<Promise<Task>>;
  hasCode: boolean;
  codeURL: string;
  files: File[] | Array<Promise<File>>;
}

export const ProjectRecord = Record({
  codeURL: "",
  description: "",
  files: [],
  hasCode: false,
  name: "",
  tags: [],
  tasks: []
});

export class Project extends ProjectRecord implements IProject, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public name: string;
  public tags: string[];
  public description: string;
  public tasks: Task[] | Array<Promise<Task>>;
  public codeURL: string;
  public hasCode: boolean;
  public files: File[] | Array<Promise<File>>;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IProject
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }
}

export const ProjectFactory = (doc: Doc): Project => {
  const p = doc.data();
  if (p.tasks) {
    p.tasks = p.tasks.map((t: firebase.firestore.DocumentReference) => {
      return TaskFactory.fromRef(t);
    });
  }

  if (p.files) {
    p.files = p.files.map((t: firebase.firestore.DocumentReference) => {
      return FileFactory.fromRef(t);
    });
  }

  return new Project(doc.id, doc.ref, p as IProject);
};

export interface ProjectState {
  projects: { [key: string]: Project };
}

export const reducer: Reducer<ProjectState, Action<Project>> = (
  state,
  action
) => {
  const nextState = { ...state };

  switch (action.action) {
    case ADD_PROJECT:
      nextState.projects[action.payload.key] = action.payload;
      break;

    case MODIFY_PROJECT:
      break;

    case REMOVE_PROJECT:
      delete nextState.projects[action.payload.key];
      break;

    default:
      return state;
  }

  return nextState;
};

export const ProjectActionCreator: ActionCreator<Project, Action<Project>> = {
  added: (doc: Project) => Add(doc),
  modified: (doc: Project) => Modify(doc),
  removed: (doc: Project) => Remove(doc)
};

const ADD_PROJECT = "@project/add";
const MODIFY_PROJECT = "@project/modify";
const REMOVE_PROJECT = "@project/remove";

export const Add = (todo: Project): Action<Project> => {
  return {
    action: ADD_PROJECT,
    payload: todo
  };
};

export const Modify = (todo: Project): Action<Project> => {
  return {
    action: MODIFY_PROJECT,
    payload: todo
  };
};

export const Remove = (todo: Project): Action<Project> => {
  return {
    action: REMOVE_PROJECT,
    payload: todo
  };
};

export const ProjectStore = new LiveStore(
  "/projects", // collection to listen on
  { projects: {} }, // initial state of todos
  ProjectFactory, // how to make a todo from a firebase doc
  ProjectActionCreator, // how to create update actions
  reducer // how to change the state from A => B
);
