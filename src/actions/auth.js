import axios from 'axios'
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut 
  } from 'firebase/auth'
import {auth} from './../firebase'

const signUp = async data => {

    const {email, password, firstName, lastName, businessName } = data

    try {
        const response = await axios.post('auth/signup', {
            email, 
            password, 
            firstName, 
            lastName, 
            businessName
        }, {
            withCredentials: true
        })
      
      if(response?.data) {
        return response.data
      } else {
        return null
      }

    } catch (error) {
      throw error
    }
}

const signIn = async data => {
    try {
        const {email, password} = data

        console.log('signing in ,', data )
        const firebaseResponse = await signInWithEmailAndPassword(auth, email, password)
        //const token = await firebaseResponse.user.getIdToken()
        const response = await axios.post('auth/signin', {
            email: firebaseResponse.user.email
        }, {withCredentials: true})

        if(response?.data) {
            return response?.data
        } else {
            return null
        }
    }catch (error) {
        console.log(error)
        throw error
    }
}

const googleSignIn = async () => {

    const provider = new GoogleAuthProvider()

    try {
        const firebaseResponse = await signInWithPopup(auth, provider)
        //const token = await firebaseResponse.user.getIdToken()
        const response = await axios.post('auth/signin', {
            email: firebaseResponse.user.email
        }, { withCredentials: true})

        if(response?.data) {
            return response?.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        throw error
    }
}

export default {
    signUp,
    signIn,
    googleSignIn,
    logout
}