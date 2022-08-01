import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import { signup, signin } from '../actions/auth'
export default createStore({
  state: {
    user: null
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

      signin({email, password}).then(res => {
        if (res && res.jwt && localStorage) {
          localStorage.setItem('data', JSON.stringify(res))
        }
        if (res) {
          commit('SET_USER', res.message)
    
          router.push('/')
        }
      }).catch(err => {
        console.log(err)
      })

    },

    async register ({ commit}, details) {
       const {email, password, firstName, lastName, businessName } = details

      signup({email, password, firstName, lastName, businessName}).then(res => {
        if (res && res.jwt && localStorage) {
          localStorage.setItem('data', JSON.stringify(res))
        }
        if (res) {
          commit('SET_USER', res.message)
    
          router.push('/')
        }
      }).catch(err => {
        console.log(err)
      })

    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
    
  }
})
