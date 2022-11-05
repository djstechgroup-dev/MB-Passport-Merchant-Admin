<template>
    <main>

        <div v-if="error" class="error">{{error}}</div>

        <h1 class="py-3 text-center">{{formData.businessName}}</h1>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                    <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Business Information</h2></td>
                    <td class="text-center" style="width: 350px"><h2>Preview</h2></td>
                </tr>

                <tr>
                    <td style="width: 300px"><h4>Business Name</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.businessName" />
                    </td>
                    <td rowspan="7" class="text-center p-3">
                        <!-- <div class="card cover-photo-card"> -->
                            <img
                            v-if="filePreview"
                            class="img-thumbnail" 
                            :src="filePreview" 
                            alt="business photo" 
                            >

                            <div v-else class="no-photo">
                                <h1>Photo</h1>
                            </div>

                            <!-- <img
                            v-else
                            class="img-thumbnail" 
                            src="@/assets/default-cover.webp" 
                            alt="business photo" 
                            > -->
                        <!-- </div> -->
                    </td>
                </tr>

                <tr>
                    <td><h4>Address</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.address" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Operating Hours</h4></td>
                    <td style="width: 600px">                    
                        <div class="timerangepicker">
                            <div class="day-time-picker">
                                <select class="day-selector" v-model="formData.openingTime.day">
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>

                                <TimePicker 
                                inputClassName="dp-custom-input" 
                                hideInputIcon 
                                v-model="formData.openingTime.time" />
                            </div>

                            -

                            <div class="day-time-picker">
                                <select class="day-selector" v-model="formData.closingTime.day">
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>

                                <TimePicker 
                                inputClassName="dp-custom-input" 
                                hideInputIcon 
                                v-model="formData.closingTime.time" />
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td><h4>Category</h4></td>
                    <td>

                        <select 
                        style="width: 100%; padding: 10px; text-align: center;" 
                        v-model="formData.category">
                            <option value="test">Select Category</option>

                            <option v-for="(category, i) in categories" :key="i" :value="category">
                                {{category.name}}
                            </option>
                        </select>
                </td>
                
                </tr>
                <tr>
                    <td><h4>Additional Info</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.description" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Website URL</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.websiteUrl" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Image</h4></td>
                    <td>
                        <input 
                        class="input" 
                        type="file"
                        @change="handleChange" />
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="p-0">

                        <template v-if="isValidate">
                           <button v-if="loading" disabled class="btn-save">LOADING...</button>
                            <button v-else @click="createBusiness" class="btn-save">
                            SAVE 
                            </button> 
                        </template>
                        <template v-else>
                            <button class="btn-save" @click="alertValidationError">SAVE</button>
                        </template>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import {ref, watch, watchEffect} from 'vue'
import { useRouter } from 'vue-router'

import useStorage from '@/composables/useStorage'
import useUpload from '@/composables/useUpload'
import addBusiness from '@/composables/addBusiness'
import useFormValidation from '@/composables/useFormValidation'
import useCategory from '@/composables/useCategory'

import TimePicker from '../../components/TimePicker.vue'

export default {
    components: {
        TimePicker
    },
    setup() {

        const router = useRouter()

        const formData = ref({
            businessName: '',
            address: '',
            category: '',
            description: '',
            websiteUrl: '',
            openingTime: {
                day: 'Sunday',
                time: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes(),
                    seconds: new Date().getSeconds()
                }
            },
            closingTime: {
                day: 'Saturday',
                time: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes(),
                    seconds: new Date().getSeconds()
                }
            }
        })
        const loading = ref(false)
        const error = ref(null)

        const {isValidate, validate, alertValidationError} = useFormValidation()

        const {
            file,
            filePreview,
            handleChange,
            error: fileError,
            clearFile
        } = useUpload()


        const { 
            uploadBusinessPhoto,
            filePath,
            url,
            error: uploadError
        } = useStorage()

        const {create, error: createError} = addBusiness()
        const {categories, loadCategory} = useCategory()

        const createBusiness = async () => {
            loading.value = true

            let photoUrl = null
            let photoFilePath = null

            if(file.value) {
                const firestorePath = `covers/business`
                await uploadBusinessPhoto(firestorePath, file.value)

                photoUrl = url.value
                photoFilePath = filePath.value
            }
            
            await create({
                ...formData.value,
                imageUrl: photoUrl,
                imagePath: photoFilePath
            })

            loading.value = false
            clearFile()

            router.push({name: 'merchant-business'})
        }

        watch(formData.value, () => {
            validate(formData.value)
        })

        watch(uploadError, () => {
            error.value = uploadError.value
        })

        watch(fileError, () => {
            error.value = fileError.value
        })

        watch(createError, () => {
            error.value = createError.value
        })

        watchEffect(async () => {
            await loadCategory()
            clearFile()
        })

        return {
            formData,
            createBusiness,
            handleChange,
            filePreview,
            loading,
            error,
            isValidate,
            alertValidationError,
            categories
        }
    }
}

</script>

<style scoped>


    .timerangepicker {
        display: flex; 
        justify-content: space-between; 
        align-items: baseline;
        gap: 10px;
    }
    .input {
        width:100%; 
        padding: 5px;
    }

    .btn-save {
        border: none;
        outline: none;
        background-color: #C3F9D1;
        text-align: center;
        cursor: pointer;
        padding: 10px;
        width: 100%;
    }

    .btn-save:hover {
        background-color: #82ffa3;
    }

    .btn-upload {
        border: none;
        outline: none;
        background-color: #C3F9D1;
        text-align: center;
        cursor: pointer;
        padding: 10px;
        width: 100%;
    }

    .btn-upload:hover {
        background-color: #82ffa3;
    }

    .cover-photo-card {
        border-radius: 5px;
        width: 100%;
        height: 160px;
    }

    .cover-photo-img {
        width: 100%;
        height: 100%;
    }

    .error {
        padding: 5px;
        border-radius: 5px;
        background-color: rgb(253, 208, 208);
        border: 2px solid rgb(255, 91, 91);
        margin-top: 10px;
        text-align: center;
    }

    .no-photo {
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
    }
</style>