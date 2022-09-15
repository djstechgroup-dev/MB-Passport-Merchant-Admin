import {ref} from 'vue'
import { storage } from '@/firebase'
import authService from '@/services/auth.service'

const useStorage = () => {
    const filePath = ref(null)
    const error = ref(null)
    const url = ref(null)

    const uploadBusinessPhoto = async (firestorePath, file) => {

        const authUser = await authService.getAuthUser()
        filePath.value = `${firestorePath}/${authUser.user_id}/${file.name}`
        const storageRef = storage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
            error.value = null
        } catch (error) {
            console.log(error)
            error.value = error.message
        }
    }

    return {
        uploadBusinessPhoto,
        filePath,
        url,
        error
    }
}

export default useStorage