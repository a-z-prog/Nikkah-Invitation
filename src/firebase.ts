import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import configJson from '../firebase-applet-config.json';

const firebaseConfig = {
  projectId: configJson.projectId,
  appId: configJson.appId,
  apiKey: configJson.apiKey,
  authDomain: configJson.authDomain,
  storageBucket: configJson.storageBucket,
  messagingSenderId: configJson.messagingSenderId,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use the provisioned database ID with long-polling fallback for robust connection across all network environments
export const db = initializeFirestore(
  app,
  {
    experimentalAutoDetectLongPolling: true,
  },
  configJson.firestoreDatabaseId || undefined
);

export const auth = getAuth(app);

