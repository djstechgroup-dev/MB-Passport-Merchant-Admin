import axios from 'axios'
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut 
  } from 'firebase/auth'
import {auth} from '@/firebase'

const signUp = async data => {

    const {email, password, firstname, lastname } = data

    try {

        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        if(!user) throw new Error('Could not complete signup')
        await updateProfile(user, {displayName: `${firstname} ${lastname}`})

        const response = await axios.post('auth/signin')
        const data = response?.data
      
        if(!data) throw new Error('Something went wrong')

        return data

    } catch (error) {
      throw error
    }
}

const signIn = async input => {
    try {
        const {email, password} = input
        await signInWithEmailAndPassword(auth, email, password)
        const response = await axios.post('auth/signin')

        const data = response?.data

        if(!data) throw new Error('Could not sign up')

        return data
    }catch (error) {
        throw error
    }
}

const googleSignIn = async () => {

    const provider = new GoogleAuthProvider()

    try {
        await signInWithPopup(auth, provider)
        const response = await axios.post('auth/signin')

        if(!response) throw new Error('Could not sign in')

        const data = response?.data

        if(!data) throw new Error('Could not sign in')

        return data
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

const getAuthUser = async () => {
    try {
        const response = await axios.get('auth/user')
        if(!response) throw new Error('Could not get the authenticated user')

        const user = response?.data?.user
        if(!user) throw new Error('Could not get the authenticated user')

        return user

    } catch (error) {
        throw error
    }
}

export default {
    signUp,
    signIn,
    googleSignIn,
    logout,
    getAuthUser
}