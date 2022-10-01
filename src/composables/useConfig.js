import {ref} from 'vue'
import axios from 'axios'

const firebaseConfig = ref(null)

const useConfig = () => {

    const loadConfig = async () => {
        try {
            const config = await axios.get()
        } catch (error) {
            
        }
    }

    return {
        loadConfig,
        firebaseConfig
    }
}

export default useConfig