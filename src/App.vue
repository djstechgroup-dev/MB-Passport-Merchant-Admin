<template>
  <!-- <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div> -->
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useAuthStore } from './store/auth'

export default {

  setup() {

    const authStore = useAuthStore()

    onBeforeMount(async () => {
      const data = await authStore.fetchAuthUser()

      if(data) {
        localStorage.setItem('session', data?.token)
      } else {
        localStorage.removeItem('session')
      }
    })

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
