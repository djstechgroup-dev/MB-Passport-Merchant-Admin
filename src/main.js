import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import './interceptors/axios'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
const store = useAuthStore()

store.init().then(() => {
    app.component('Datepicker', Datepicker)
    app.use(router)
    app.mount('#app')
})

