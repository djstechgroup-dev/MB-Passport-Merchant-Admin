import {ref} from 'vue'

const isValidate = ref(false)

const useFormValidation = () => {
    const validate = (fields) => {

        let counter = 0

        Object.keys(fields).forEach(key => {
            if(!fields[key]) {
                counter += 1
            }
        })

        isValidate.value = (counter === 0)
    }

    const alertValidationError = () => {
        alert('Please complete the form')
    }

    return {
        validate,
        alertValidationError,
        isValidate
    }
}

export default useFormValidation