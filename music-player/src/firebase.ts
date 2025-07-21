// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function getEnvVar(name: string): string {
  // Vite exposes env variables on import.meta.env
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: getEnvVar('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnvVar('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('REACT_APP_FIREBASE_APP_ID')
};

console.log('Firebase config loaded successfully');

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);