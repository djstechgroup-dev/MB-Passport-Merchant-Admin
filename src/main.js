import { createApp } from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/router'
import {auth} from '@/firebase'
import '@/interceptors/axios'
import '@/assets/main.css'
import '@vuepic/vue-datepicker/dist/main.css'

let app

auth.onAuthStateChanged(async (user) => {
    if(user) {
        const token = await user.getIdToken()
        // console.log('token - ', token)
        // console.log('user - ', user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    if(!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})
