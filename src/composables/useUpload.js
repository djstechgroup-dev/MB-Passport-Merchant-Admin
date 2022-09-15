import {ref} from 'vue'

const file = ref(null)
const filePreview = ref(null)
const error = ref(null)
const types = ['image/png', 'image/jpeg']

const useUpload = () => {

    const handleChange = e => {
        const selected = e.target.files[0]

        if(selected && types.includes(selected.type)) {

            const reader = new FileReader()

            reader.onload = event => {
                filePreview.value = event.target.result
            }

            reader.readAsDataURL(selected)

            file.value = selected

            console.log(selected)
            error.value = null
        } else {
            file.value = null
            filePreview.value = null
            error.value = 'Invalid file'
        }
    }

    const setFile = (filePath) => {
        file.value = filePath
    }

    const setFilePreview = (preview) => {
        filePreview.value = preview
    }

    const clearFile = () => {
        file.value = null
        filePreview.value = null
        error.value = null
    }

    return {
        file, 
        filePreview, 
        error, 
        handleChange,
        setFile,
        setFilePreview,
        clearFile
    }
}

export default useUpload