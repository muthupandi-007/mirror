import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6E6CjPj0A66o2o8R4YBOeyQTWQncrOOM",
  authDomain: "virtual-mirror-4f519.firebaseapp.com",
  projectId: "virtual-mirror-4f519",
  storageBucket: "virtual-mirror-4f519.firebasestorage.app",
  messagingSenderId: "544941880680",
  appId: "1:544941880680:web:0419236673774a48aad2dd",
  measurementId: "G-863DNPLSCL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize analytics only when supported (e.g., browser env)
isAnalyticsSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;
