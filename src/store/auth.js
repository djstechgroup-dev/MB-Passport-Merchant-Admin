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
        permission(state) {

            if(state.user) {
                const role = state.user.role

                if(role === 0) return 'admin'
                else return 'merchant'                
            } else {
                return 'user'
            }

        },
        isAuth(state) {
            return state.user !== null
        }
    },
    actions: {
        async signUp(data) {

            const {email, password, firstName, lastName, businessName } = data

            try {

              const response = await axios.post('auth/signup', {email, password, firstName, lastName, businessName}, {
                withCredentials: true
              })
              
              if(response.data) {
                alert('Success, you may now sign in your account')
                router.push('/login')
              }
      
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

                console.log('firebase response - ', response)
                console.log('api response - ', data)
                
                // localStorage.setItem('session', data.token)

                // const user = data?.user

                // this.user = user

                // router.push('/')

            } catch (error) {
              console.log(error)
            }
        },
        async signOut() {
            
            try {

                await signOut(auth)
                const {data} = await axios.post('auth/signout', {
                    withCredentials: true
                })
                
                if(data.success) {
                    this.user = null
                    localStorage.removeItem('session')
                    router.push('/login')
                }
            } catch (error) {
                console.log(error)
            }
        },
        // async fetchAuthUser () {

        //     try {
        //         const response = await axios.get('auth/user', {
        //             withCredentials: true
        //         })

        //         console.log(response.data)

        //         if(response.data) {
        //             this.user = response.data.user 
        //             return response.data
        //         } else {
        //             this.user = null
        //             return null

        //         }
                
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        fetchAuthUser () {
            auth.onAuthStateChanged(async user => {

                if(!user) {
                    this.user = null
                    localStorage.removeItem('session')
                } else {

                    const token = await user.getIdToken()

                    this.user = user
                    localStorage.setItem('session', token)
                }
            })
        }
    }
}) 