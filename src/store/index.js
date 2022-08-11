import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import { signup, signin } from '../actions/auth'
export default createStore({
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

        const userData = await signin(email)

        console.log(userData)

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


    async register ({ commit}, details) {

      const {email, password, firstName, lastName, businessName } = details

      try {
        const user = await signup({email, password, firstName, lastName, businessName})
        localStorage.setItem('session', token)
        commit('SET_USER', user)
        router.push('/')

      } catch (error) {
        console.log(error)
      }
    },


    async logout ({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login')
    },


    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {

        const token= user.accessToken

        const response = await fetch('http://localhost:8000/api/auth/user', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const {user: authUser} = await response.json()


        if (authUser === null) {
          commit('CLEAR_USER')
        } else {

          commit('SET_USER', authUser)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }

      })
    }
    
  }
})
