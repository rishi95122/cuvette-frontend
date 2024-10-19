
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_apiKey,
  authDomain: import.meta.env.VITE_API_authDomain,
  projectId: import.meta.env.VITE_API_projectId,
  storageBucket:import.meta.env.VITE_API_storageBucket ,
  messagingSenderId:import.meta.env.VITE_API_messagingSenderId ,
  appId:import.meta.env.VITE_API_appId,
  measurementId: import.meta.env.VITE_API_measurementId
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
auth.settings.appVerificationDisabledForTesting = true
export default app;