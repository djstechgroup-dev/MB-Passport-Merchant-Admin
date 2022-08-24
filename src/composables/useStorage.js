import {ref} from 'vue'
import { firebaseStorage } from '../firebase'

const useStorage = () => {
    const filePath = ref(null)
    const error = ref(null)
    const url = ref(null)

    const uploadBusinessPhoto = async (file) => {
        console.log(file)
        filePath.value = `business/sdad123123sadassas/${file.name}`
        const storageRef = firebaseStorage.ref(filePath.value)

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