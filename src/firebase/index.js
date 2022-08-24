import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDYdKW5l0gZKPM4boKJm0aPLYOXJAA1XkU",
  authDomain: "myrtle-beach-passport.firebaseapp.com",
  projectId: "myrtle-beach-passport",
  storageBucket: "myrtle-beach-passport.appspot.com",
  messagingSenderId: "526517584025",
  appId: "1:526517584025:web:94564a73df690fcee37808",
  measurementId: "G-YDWB6S10JS"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firebaseStorage = firebase.storage()

export { auth, firebaseStorage }