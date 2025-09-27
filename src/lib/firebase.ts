
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, disableNetwork, enableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-1540181722-94b36",
  "appId": "1:213393110975:web:bca3af7a9bff6fe759930a",
  "apiKey": "AIzaSyDuQDBEKMEfMbx9TOhKAvL_TTzRvfHZ7Ko",
  "authDomain": "studio-1540181722-94b36.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "213393110975"
};

function initializeFirebase() {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

const app = initializeFirebase();
const db = getFirestore(app);

// This is the key part for offline support.
// It enables the app to store data locally in IndexedDB.
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one.
        // ...
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
}

export { app, db, disableNetwork, enableNetwork };
