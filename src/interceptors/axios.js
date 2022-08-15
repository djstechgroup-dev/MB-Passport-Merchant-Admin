import axios from 'axios'
const token = localStorage.getItem('session') || ''

axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

let refresh = false

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true

        const {status, data} = await axios.post('auth/refresh', {}, {
            withCredentials: true
        })

        if (status === 200) {
            localStorage.setItem('session', data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            return axios(error.config)
        }
    }
    refresh = false
    return error
})