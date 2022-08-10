import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDYdKW5l0gZKPM4boKJm0aPLYOXJAA1XkU",
  authDomain: "myrtle-beach-passport.firebaseapp.com",
  projectId: "myrtle-beach-passport",
  storageBucket: "myrtle-beach-passport.appspot.com",
  messagingSenderId: "526517584025",
  appId: "1:526517584025:web:94564a73df690fcee37808",
  measurementId: "G-YDWB6S10JS"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }