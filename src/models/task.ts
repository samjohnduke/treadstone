import { firestore } from "firebase";
import { Record } from "immutable";
import { Doc, Ref } from "src/firebase/firestore";

export interface ITask {
  name: string;
  tags: string[];
  description: string;
  tasks: any[];
  hasCode: boolean;
  codeURL: string;
}

export const TaskRecord = Record({
  codeURL: "",
  description: "",
  hasCode: false,
  name: "",
  tags: [],
  tasks: []
});

export class Task extends TaskRecord implements ITask, Ref {
  public key: string | undefined;
  public ref: firebase.firestore.DocumentReference | undefined;
  public name: string;
  public tags: string[];
  public description: string;
  public tasks: any[];
  public codeURL: string;
  public hasCode: boolean;

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
