import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

const deleteDeal = () => {

    const removeDeal = async (id) => {
        try {
            loading.value = true
            const res = await businessService.deleteDeal(id)
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
        removeDeal
    }

}

export default deleteDeal