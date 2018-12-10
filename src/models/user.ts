import { Record } from "immutable";
import { Ref } from "src/firebase/firestore";

export interface IUser {
  bio: string;
  email: string;
  name: string;
  profileUrl: string;
}

export const UserRecord = Record({
  bio: "",
  email: "",
  name: "",
  profileUrl: ""
});

export class User extends UserRecord implements IUser, Ref {
  public key: string;
  public ref: firebase.firestore.DocumentReference;
  public bio: string;
  public email: string;
  public name: string;
  public profileUrl: string;

  constructor(
    key: string,
    ref: firebase.firestore.DocumentReference,
    props: IUser
  ) {
    super(props);
    this.key = key;
    this.ref = ref;
  }
}
