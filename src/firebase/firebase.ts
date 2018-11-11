import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as Fire from '../constants/firebase';

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