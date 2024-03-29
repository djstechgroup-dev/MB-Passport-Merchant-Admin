import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref(null)
const error = ref(null)
const loading = ref(false)

const getBusiness = (id) => {

    const fetchBusiness = async () => {
        try {
            loading.value = true
            const response = await businessService.getBusinessById(id)
            data.value = response
            loading.value = false
        } catch (err) {
            console.log(err)
            error.value = err.message
            loading.value = false
        }
    }

    return {fetchBusiness, data, error, loading}
}

export default getBusiness