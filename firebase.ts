import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpuXzVTjIdSq1UIznoivL1XVAIMrVnoYw",
    authDomain: "catering-react.firebaseapp.com",
    projectId: "catering-react",
    storageBucket: "catering-react.appspot.com",
    messagingSenderId: "5328580743",
    appId: "1:5328580743:web:24790b84590853043b0822",
    measurementId: "G-VHHPS7M7VB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    app,
}
export default auth;