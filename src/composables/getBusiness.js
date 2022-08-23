import {ref} from 'vue'
import { useBusinessStore } from '../store/business'

const getBusiness = () => {

    const store = useBusinessStore()

    const businesses = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            businesses.value = await store.getBusiness()
        } catch (error) {
            error.value = error
        }
    }

    return {businesses, error, load}
}

export default getBusiness