
/*const apiKey = process.env.apiKey;
const authDomain = process.env.authDomain;
const projectId = process.env.projectId;
const storageBucket = process.env.storageBucket;
const messagingSenderId = process.env.messagingSenderId;
const appId = process.env.appId;*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

const SignUp = async (name, email, password) => {
  // auth - the firebase auth instance we created previously
  // email, password - string values for email and password
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCred => {
    
    updateProfile(userCred.user, {
      displayName: name
    });

    setDoc(doc(db, "users", userCred.user.uid), {
      name: name,
      email: userCred.user.email,
      reading_speed: 0,
      books_read: 0

    });

    // userCred.user will have all information
    // regarding our user, if they are signed-in
    console.log(userCred.user?.email)
    window.location.href = "/index.html";
  })
}

import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

setPersistence(auth, browserLocalPersistence);

const LogIn = async (email, password) => {
  // firebaseAuth - the firebase auth instance we created previously
  // email, password - string values for email and password

  signInWithEmailAndPassword(auth, email, password)
  .then(userCred => {
    // userCred.user will have all information
    // regarding our user, if they are signed-in
    console.log(userCred.user)
    console.log("LogIn Worked!")
    // TEMP REMOVE LATER MAKE THIS GO TO DASHBOARD
    window.location.href = "/dashboard.html";
  })
}

import { collection, getDocs } from "firebase/firestore";

async function getUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

import {getDoc} from "firebase/firestore";

async function setProfile() {
  const auth = getAuth();

  // mark the callback async
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // user is signed in
      const uid = user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // Update the page
        document.getElementById("nameDisplay").innerText = docSnap.data().name;
        document.getElementById("emailDisplay").innerText = docSnap.data().email;
        document.getElementById("booksDisplay").innerText = "Books Read: " + docSnap.data().books_read;
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("No user is signed in");
    }
  });
}

function passwordReset()
{
  const email = document.getElementById("emailInput").value;

  sendPasswordResetEmail(auth, email)
  .then(() => {
      // Password reset email sent!
      // ..
      console.log("Email sent!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//IDK IF THIS WORKS
/*import { getAuth, signOut } from "firebase/auth";

signOut(auth)
.then(() => {
  // Sign-out successful.
}).catch((error) => {
  // show your error messages
});*/


window.SignUp = SignUp;
window.LogIn = LogIn;
window.getUsers = getUsers;
window.setProfile = setProfile;
window.passwordReset = passwordReset;