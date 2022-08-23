import {ref} from 'vue'
import {useBusinessStore} from './../store/business'

const addLocation = id => {

    const store = useBusinessStore()
    const business = ref({})
    const formData = ref({})

    const load = async () => {
        business.value = await store.getBusinessById(id)
    }
        
    const add = () => {
        store.addLocation({
            ...formData.value,
            businessId: business.value._id
        })
    }

    return {
        business,
        formData,
        load,
        add
    }
}

export default addLocation