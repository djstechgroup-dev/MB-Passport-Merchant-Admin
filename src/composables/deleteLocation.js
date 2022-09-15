import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

const deleteLocation = () => {

    const removeLocation = async (id) => {
        try {
            loading.value = true
            const res = await businessService.deleteLocation(id)
            data.value = res
            loading.value = false
            error.value = null
        } catch (error) {
            error.value = error.message
        }
    }

    return {
        data,
        loading,
        error,
        removeLocation
    }

}

export default deleteLocation