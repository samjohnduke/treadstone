import { firestore } from "./firebase";

firestore
  .collection("/todos")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });
