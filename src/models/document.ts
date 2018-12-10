import { firestore } from "src/firebase/firebase";

export class LiveDocument<State> {
  private store: State;
  private subscription: () => void;

  constructor(initialState: State) {
    this.store = initialState;

    this.subscription = firestore
      .collection("/users")
      .doc("BMRvH9myrxZdrRQd82HmlJIriJy1")
      .onSnapshot(snapshot => {
        console.log(snapshot);
      });
  }

  public close() {
    this.subscription();
  }

  public getState = () => {
    return this.store;
  };
}
