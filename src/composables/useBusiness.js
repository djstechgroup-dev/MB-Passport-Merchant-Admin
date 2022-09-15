
import {ref} from 'vue'
import businessService from '@/services/business.service'

const error = ref(null)
const data = ref(null)
const loading = ref(false)

const locations = ref(null)
const getLocationError = ref(null)

const useBusiness = () => {

    const getBusiness = async id => {
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

    const getLocations = async id => {
        try {
            const locationsResponse = await businessService.getBusinessLocations(id)
            locations.value = locationsResponse
        } catch (error) {
            getLocationError.value = error
        }
    }


    return {getBusiness, getLocations, data, locations, loading, error, getLocationError}
}

export default useBusiness