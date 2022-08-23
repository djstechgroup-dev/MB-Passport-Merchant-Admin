import {defineStore} from 'pinia'
import router from '../router'
import {auth} from './../firebase'
import authAction from './../actions/auth'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        error: ''
    }),
    getters: {
        userRole(state) {
            if(state.user?.role === 0) return 'admin'
            return 'merchant'
        },
        isAuthenticated(state) {
            return state.user !== null
        },
        redirectLink() {
            if(this.user) {
                if(this.user?.role) {
                    if(this.user.role === 0) {
                        return '/admin'
                    }
                    return '/'
                }
            }
            return '/'
        }
    },
    actions: {
        async signUp(data) {
            try {
                const response = await authAction.signUp(data)

                if(!response) throw new Error('Something went wrong')

                const signInResponse = await authAction.signIn({
                    email: data.email,
                    password: data.password
                })
                if(!signInResponse) throw new Error('Something went wrong')

                this.user = signInResponse.user
                this.error = ''

                router.push(this.redirectLink)
      
            } catch (error) {
              this.user = null
              this.error = error.message
            }
        },

        async signIn(email, password) {

            try {
                const response = await authAction.signIn({email, password})
                if(!response) throw new Error('Something went wrong')

                this.user = response.user
                this.error = ''

                router.push(this.redirectLink)

              } catch (error) {
                switch(error.code) {
                  case 'auth/user-not-found':
                    this.error = 'Invalid credentials'
                    break
                  case 'auth/wrong-password':
                    this.error = 'Incorrect password'
                    break
                  default:
                    this.error = error.message
                }

                return this.error
              }
        },

        async signInWithGoogle() {
            try {
                const response = await authAction.googleSignIn()
                if(!response) throw new Error('Something went wrong')

                this.user = response.user
                this.error = ''

                router.push(this.redirectLink)

              } catch (error) {
                console.log(error)
                switch(error.code) {
                  case 'auth/user-not-found':
                    this.error = 'Invalid credentials'
                    break
                  case 'auth/wrong-password':
                    this.error = 'Incorrect password'
                    break
                  default:
                    this.error = error.message
                }
              }
        },

        async signOut() {
            await authAction.logout()
            router.push('/login')
        },

        init() {
            return new Promise(resolve => {
                auth.onAuthStateChanged(async user => {
                    try {
                        if(!user) throw new Error

                        const token = await user.getIdToken()
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                            
                        const response = await axios.get('auth/user', {
                            withCredentials: true
                        })
    
                        const resUser = response?.data?.user

                        if(!resUser) throw new Error
    
                        this.user = resUser
                        
                    } catch (error) {
                        this.user = null
                        this.error = error.message
                    }

                    resolve(this.user)
                })
            })
        
        }
    }
}) 