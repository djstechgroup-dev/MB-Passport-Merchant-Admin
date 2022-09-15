import {ref} from 'vue'


const data = ref(null)
const error = ref(null)

const useLocation = () => {
    
    const getLocation = async id => {
        try {
            const response = await businessService.getLocationById(id)
            data.value = response
        } catch (err) {
            error.value = err.message
        }
    }

    return {
        data, error, getLocation
    }
}

export default useLocation