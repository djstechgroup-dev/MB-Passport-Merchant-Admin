import {defineStore} from 'pinia'
import  axios  from 'axios'
import router from '../router'

export const useBusinessStore = defineStore('business', {
    state: () => ({
        business: null
    }),
    getters: {

    },
    actions: {

        async addBusiness(data) {
            try {
                const response = await axios.post('business/new', data, {
                    withCredentials: true
                })
                
                console.log(response)

                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },

        async getBusiness() {
            try {
                const response = await axios.get('merchant/my-business', {
                    withCredentials: true
                })
                
                return response.data.business

            } catch (error) {
                console.log(error)
            }
        },

        async getBusinessById(id) {
            try {
                const response = await axios.get(`merchant/my-business/${id}`, {
                    withCredentials: true
                })
                
                return response.data.business

            } catch (error) {
                console.log(error)
            }
        },

        async addLocation(data) {

            try {
                const response = await axios.post('business/add-location', data, {
                    withCredentials: true
                })
                
                console.log(response)
                router.push('/individualpage')
            } catch (error) {
                console.log(error)
            }
        },
    }
}) 