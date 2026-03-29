
/*const apiKey = process.env.apiKey;
const authDomain = process.env.authDomain;
const projectId = process.env.projectId;
const storageBucket = process.env.storageBucket;
const messagingSenderId = process.env.messagingSenderId;
const appId = process.env.appId;*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /*apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId*/
  apiKey:"AIzaSyDPWgUlHn-Wf96hBGdVQrMWTOGbfvX2cyM",
  authDomain: "kenthackenough-bookclubwebsite.firebaseapp.com",
  projectId: "kenthackenough-bookclubwebsite",
  storageBucket: "kenthackenough-bookclubwebsite.firebasestorage.app",
  messagingSenderId: "295623421956",
  appId: "1:295623421956:web:bb807a2953c7eed3eec551"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

import { createUserWithEmailAndPassword } from "firebase/auth"

const SignUp = async (email, password) => {
  // auth - the firebase auth instance we created previously
  // email, password - string values for email and password
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCred => {
    // userCred.user will have all information
    // regarding our user, if they are signed-in
    console.log(userCred.user?.email)
  })
}
window.SignUp = SignUp;

function testFunction(){
  alert("This is working!");
}