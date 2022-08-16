import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
const pinia = createPinia()
import './interceptors/axios'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
//import store from './store'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// library.add(faUserSecret)
const app = createApp(App)
app.component('Datepicker', Datepicker)
app.use(pinia)
app.use(router)
app.mount('#app')
