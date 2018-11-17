import { Record } from "immutable";
import { ActionCreator, Doc, Ref } from "src/firebase/firestore";
import { Action, LiveStore, Reducer } from "./store";

export interface IProject {
  name: string;
}

export const ProjectRecord = Record<IProject>({
  name: ""
});

export class Project extends ProjectRecord implements IProject, Ref {
  public name: string;
  public key: string;

  constructor(key: string, props: IProject) {
    super(props);
    this.key = key;
  }
}

export const ProjectFactory = (doc: Doc): Project => {
  return new Project(doc.id, doc.data() as IProject);
};

export interface ProjectState {
  projects: { [key: string]: Project };
}

export const reducer: Reducer<ProjectState, Action<Project>> = (
  state,
  action
) => {
  return state;
};

export const ProjectActionCreator: ActionCreator<Project, Action<Project>> = {
  added: (doc: Project) => Add(doc),
  modified: (doc: Project) => Modify(doc),
  removed: (doc: Project) => Remove(doc)
};

export const Add = (todo: Project): Action<Project> => {
  return {
    action: "@project/add",
    payload: todo
  };
};

export const Modify = (todo: Project): Action<Project> => {
  return {
    action: "@project/modify",
    payload: todo
  };
};

export const Remove = (todo: Project): Action<Project> => {
  return {
    action: "@project/remove",
    payload: todo
  };
};

export const ProjectStore = new LiveStore(
  "/projects", // collection to listen on
  {}, // initial state of todos
  ProjectFactory, // how to make a todo from a firebase doc
  ProjectActionCreator, // how to create update actions
  reducer // how to change the state from A => B
);
