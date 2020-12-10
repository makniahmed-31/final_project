import * as firebase from "firebase/firebase";
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdvWMjnNxUWkOuP59vJUW5O6_IbWqsvZk",
  authDomain: "newtech-ecommerce.firebaseapp.com",
  databaseURL: "https://newtech-ecommerce.firebaseio.com",
  projectId: "newtech-ecommerce",
  storageBucket: "newtech-ecommerce.appspot.com",
  messagingSenderId: "1072260152050",
  appId: "1:1072260152050:web:6b642870da0b8644d12e6b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export ...



export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();


