import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
const pinia = createPinia()
import './interceptors/axios'
//import store from './store'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// library.add(faUserSecret)
createApp(App).use(pinia).use(router).mount('#app')
