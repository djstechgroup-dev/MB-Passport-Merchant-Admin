import {defineStore} from 'pinia'
import  axios  from 'axios'
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut 
  } from 'firebase/auth'
import router from '../router'
import {auth} from './../firebase'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    getters: {
        permission() {

            if(this.user) {
                const role = this.user.role

                if(role === 0) return 'admin'
                else return 'merchant'                
            } else {
                return 'user'
            }

        }
    },
    actions: {
        async signUp(data) {

            const {email, password, firstName, lastName, businessName } = data

            try {
              const response = await signup({email, password, firstName, lastName, businessName})
              if(response.error) throw response.error.message
              alert('Success, you may now sign in your account')
              router.push('/login')
      
            } catch (error) {
              alert(error)
            }
        },
        async signIn(email, password) {

            try {
                const response = await signInWithEmailAndPassword(auth, email, password)
                console.log(response)
                const {data} = await axios.post('auth/signin', {email}, {
                    withCredentials: true
                })
                localStorage.setItem('session', data.token)
                const user = data?.user
                this.user = user
                router.push('/')
              } catch (error) {
                switch(error.code) {
                  case 'auth/user-not-found':
                    alert('Invalid credentials')
                    break
                  case 'auth/wrong-password':
                    alert('Incorrect password')
                    break
                  default:
                    alert(error.message)
                }
              }
        },
        async signInWithGoogle() {

            const provider = new GoogleAuthProvider()

            try {
                const response = await signInWithPopup(auth, provider)
                const email = response.user.email
                const {data} = await axios.post('auth/signin', {email}, {
                    withCredentials: true
                })
                
                localStorage.setItem('session', data.token)

                const user = data?.user

                this.user = user

                router.push('/')

            } catch (error) {
              console.log(error)
            }
        },
        signOut() {

        },
        async fetchUser () {
            console.log('fetching user')
            try {
                const {data} = await axios.get('auth/user', {
                    withCredentials: true
                })

                if(data.user) {
                    
                   localStorage.setItem('session', data.token)
                    this.user = data.user 

                    console.log('state...', this.user.role)
                } else {
                    localStorage.removeItem('session')
                    this.user = null
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}) 