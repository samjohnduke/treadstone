import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const userFeedCount = functions.https.onRequest((request, response) => {
  return admin
    .firestore()
    .collection("users")
    .doc("BMRvH9myrxZdrRQd82HmlJIriJy1")
    .collection("feeds")
    .get()
    .then(snapshot => {
      response.send(snapshot.size);
    });
});
