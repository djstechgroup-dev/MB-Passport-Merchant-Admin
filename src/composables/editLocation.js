import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const error = ref(null)

const editLocation = (id) => {

    const update = async (payload) => {
        try {
            const response = await businessService.updateLocation(id, payload)
            data.value = response
            error.value = null
        } catch (error) {
            error.value = error.message
        }
    }

    return {update, data, error}
}

export default editLocation