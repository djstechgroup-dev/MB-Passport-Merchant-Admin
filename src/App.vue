<template>
  <!-- <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div> -->
  <router-view/>
</template>

<script>
import { onBeforeMount, onMounted } from 'vue'
import { useAuthStore } from './store/auth'

export default {

  data() {
    return {
      authUser: null,
      authPermission: ''
    }
  },
  methods: {
    redirectAuthUser: function(e) {
      console.log(this.permission)
    }
  },
  beforeMount() {
    const authStore = useAuthStore()
    authStore.fetchUser()

    const user = authStore.user
    const permission = authStore.permission

    this.user = user
    this.permission = permission
  },
  created() {
    window.addEventListener('beforeunload', this.redirectAuthUser)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
