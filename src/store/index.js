import Vuex from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import { signup, signin } from '../actions/auth'

const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    currentUser (state) {
      return state.user
    }
  },
  mutations: {

    SET_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },

  actions: {
    async login ({ commit }, details) {

      const { email, password } = details

      try {

        await signInWithEmailAndPassword(auth, email, password)

        const {token, user} = await signin(email)

        localStorage.setItem('session', token)
        commit('SET_USER', user)
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

    async signInWithGoogle({commit}) {

      const provider = new GoogleAuthProvider()

      try {
        const result = await signInWithPopup(auth, provider)
        const email = result.user.email
        const {token, user} = await signin(email)

        localStorage.setItem('session', token)
        commit('SET_USER', user)
        router.push('/')

      } catch (error) {
        console.log(error)
      }
    },


    async register ({commit},details) {

      const {email, password, firstName, lastName, businessName } = details

      try {
        const response = await signup({email, password, firstName, lastName, businessName})

        if(response.error) throw response.error.message

        alert('Success, you may now sign in your account')

        router.push('/login')

      } catch (error) {
        alert(error)
        console.log(error)
      }
    },


    async logout ({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login')
    },


    async fetchUser ({ commit }) {

      auth.onAuthStateChanged(async user => {

        if(user) {

          const token = user.accessToken

          const response = await fetch('http://localhost:8000/api/auth/user', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })

          let _user = await response.json()
          
          console.log(_user)
          
          if(_user.role == 1) {
            router.push('/admin')
          } else {
            router.push('/')
          }

          commit('SET_USER', _user)

            
          

        } else {
          commit('CLEAR_USER')
        }

      })
    }
    
  }
})

export default store