import { firestore } from "firebase";
import { Record } from "immutable";
import { Doc, Ref } from "src/firebase/firestore";

export interface IFile {
  name: string;
  url: string;
}

export const FileRecord = Record({
  name: "",
  url: ""
});

export class File extends FileRecord implements IFile, Ref {
  public key: string | undefined;
  public ref: firebase.firestore.DocumentReference | undefined;
  public name: string;
  public url: string;

  constructor(
    key: string | undefined,
    ref: firebase.firestore.DocumentReference | undefined,
    props: IFile
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }
}

export const FileFactory = {
  fromFirebase: (doc: Doc): File => {
    return new File(doc.id, doc.ref, doc.data() as IFile);
  },
  fromRef: async (doc: firestore.DocumentReference): Promise<File> => {
    const data = await doc.get();
    return new File(data.id, data.ref, data.data() as IFile);
  },
  newFromJS: async (doc: IFile): Promise<File> => {
    const file = new File(undefined, undefined, doc);
    return file;
  }
};
