import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const error = ref(null)
const loading = ref(false)

const addLocation = () => {

    const add = async (payload) => {

        try {
            loading.value = true
            const res = await businessService.addLocation(payload)
            data.value = res
            loading.value = false
            error.value = null
        } catch (err) {
            error.value = err.message
        }
        
    }

    return {
        data, 
        add,
        error
    }
}

export default addLocation