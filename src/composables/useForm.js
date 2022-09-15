import {ref} from 'vue'

const formData = ref(null)

const useForm = (input) => {

    formData.value = input

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return {
        formData,
        handleChange,
        handleSubmit
    }

}

export default useForm