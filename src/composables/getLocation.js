import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const error = ref(null)
const loading = ref(false)

const getLocation = (id) => {

    const fetchLocation = async () => {
        try {
            loading.value = true
            const response = await businessService.getLocationById(id)
            data.value = response
            loading.value = false
        } catch (err) {
            console.log(err)
            error.value = err.message
            loading.value = false
        }
    }

    return {fetchLocation, data, error, loading}
}

export default getLocation