import admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.json");

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
