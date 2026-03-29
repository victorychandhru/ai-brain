
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
  auth = getAuth(app);
  firestore = getFirestore(app);
  return { app, auth, firestore };
}

export * from './provider';
export * from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
