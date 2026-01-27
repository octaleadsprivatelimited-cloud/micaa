import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4yfTDtFbbUw3SDV_Fmczqs2h-h_mb9a8",
  authDomain: "svn-global.firebaseapp.com",
  projectId: "svn-global",
  storageBucket: "svn-global.firebasestorage.app",
  messagingSenderId: "91693017114",
  appId: "1:91693017114:web:a5447bc5f081c0fbcb49a3",
  measurementId: "G-HK7CE7TK7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Analytics only if supported (not in SSR or unsupported browsers)
let analytics: ReturnType<typeof getAnalytics> | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, analytics, storage };
