import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const error = ref(null)

const addBusiness = () => {

    const create = async (payload) => {
        try {
            const response = await businessService.createBusiness(payload)
            data.value = response
            error.value = null
        } catch (error) {
            console.log(error)
            error.value = error.message
        }
    }

    return {create, data, error}
}

export default addBusiness