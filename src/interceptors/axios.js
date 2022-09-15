import axios from 'axios'
import {auth} from '@/firebase'

axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.withCredentials = true

let refresh = false

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true

        const user = await auth.currentUser

        if(user) {
            const token = await user.getIdToken()
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return axios(error.config)
        }
    }
    refresh = false
    return error
})