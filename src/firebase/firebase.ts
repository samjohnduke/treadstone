import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import * as Fire from "../constants/firebase";

const config = {
  apiKey: Fire.API_KEY,
  authDomain: Fire.AUTH_DOMAIN,
  databaseURL: Fire.DATABASE_URL,
  messagingSenderId: Fire.MESSAGE_SENDER_ID,
  projectId: Fire.PROJECT_ID,
  storageBucket: Fire.STORAGE_BUCKET
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
firestore.enablePersistence().catch(err => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
    console.log("err - multiple tabs is no good");
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.log("err - your browser is too old");
  }
});
