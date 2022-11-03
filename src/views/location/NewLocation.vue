<template>
    <main>

        <span v-if="loading">Loading...</span>

        <template v-else>
            <h1 class="py-3 text-center">{{business.businessName}}</h1>

            <table class="table table-bordered" style="border: 2px solid;">
                <tbody class="text-center" style="border: 2px solid;">

                    <tr>
                        <td colspan="2" style="background-color: #0D47AA" class="text-center text-white">
                            <h2>New Location</h2>
                        </td>
                        <td class="text-center"><h2>Location Preview</h2></td>
                    </tr>

                    <tr>
                        <td ><h4>Location Name</h4></td>
                        <td>
                            <input type="text" class="input" v-model="formData.name" />
                        </td>
                        <td rowspan="7" class="text-center p-3">
                            
                            <img
                            v-if="filePreview"
                            class="img-thumbnail" 
                            :src="filePreview" 
                            alt="business photo" 
                            >

                            <img
                            v-else
                            class="img-thumbnail" 
                            src="@/assets/default-cover.webp" 
                            alt="business photo" 
                            >

                            <div class="form-check text-center mt-4">
                                <input 
                                class="form-check-input" 
                                type="checkbox" 
                                @click="useBusinessPhoto = !useBusinessPhoto" 
                                v-model="useBusinessPhoto" 
                                id="useBusinessPhoto">
                                <label class="form-check-label" for="useBusinessPhoto">
                                    Use Business Photo
                                </label>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="width: 240px"><h4>Location Address</h4></td>
                        <td>
                            <input type="text" class="input" v-model="formData.address" />
                        </td>
                    </tr>

                    <tr>
                        <td><h4>Location Info</h4></td>
                        <td>
                            <input type="text" class="input" v-model="formData.info" />
                        </td>
                    </tr>

                    <tr>
                        <td><h4>Operating Hours</h4></td>
                        <td style="width: 450px;">
                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Sunday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Sunday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Sunday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Sunday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Monday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Monday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Monday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Monday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Tuesday" disabled style="width: 92px;" />
                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Tuesday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Tuesday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Tuesday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Wednesday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Wednesday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Wednesday" disabled style="width: 92px;" />
                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Wednesday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Thursday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Thursday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Thursday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Thursday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Friday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Friday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Friday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Friday.time" />
                                </div>
                            </div>

                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <input class="day-selector" value="Saturday" disabled style="width: 92px;" />

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.Saturday.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <input class="day-selector" value="Saturday" disabled style="width: 92px;" />
                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.Saturday.time" />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td><h4>Placeholder</h4></td>
                        <td>
                            <input type="text" class="input" v-model="formData.placeholder" />
                        </td>
                    </tr>

                    <tr>
                        <td><h4>Image</h4></td>
                        <td>
                            <input 
                            class="input" 
                            type="file"
                            :disabled="useBusinessPhoto"
                            @change="handleChange"
                            ref="fileInput">
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" class="p-0">

                            <template v-if="isValidated">
                                <button 
                                v-if="loading" 
                                disabled 
                                class="btn-save">LOADING...
                                </button>
                                <button 
                                v-else 
                                class="btn-save"
                                @click="addBusinessLocation" >SAVE 
                                </button>
                            </template>

                            <template v-else>
                                <button 
                                class="btn-save"
                                @click="alertInvalid">SAVE</button>
                            </template>
                        </td>
                    </tr>

                </tbody>
            </table>
        </template>
        
    </main>      
</template>

<script>
import {ref, watch, watchEffect} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getBusiness from '@/composables/getBusiness'
import useUpload from '@/composables/useUpload'
import useStorage from '@/composables/useStorage'
import addLocation from '@/composables/addLocation'

import TimePicker from '../../components/TimePicker.vue'


export default {
    components: {
        TimePicker
    },
    setup() {

        const {params} = useRoute()
        const router = useRouter()

        const loading = ref(false)
        const formData = ref({
            name: '',
            address: '',
            info: '',
            placeholder: '',
            imageUrl: '',
            openingTime: {
                Sunday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Monday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Tuesday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Wednesday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Thursday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Friday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Saturday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                // day: 'Sunday',
                // time: {
                //     hours: new Date().getHours(),
                //     minutes: new Date().getMinutes(),
                //     seconds: new Date().getSeconds()
                // }
            },
            closingTime: {
                Sunday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Monday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Tuesday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Wednesday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Thursday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Friday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                Saturday: {
                    time: {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds: new Date().getSeconds()
                    }
                },
                // day: 'Saturday',
                // time: {
                //     hours: new Date().getHours(),
                //     minutes: new Date().getMinutes(),
                //     seconds: new Date().getSeconds()
                // }
            }
        })

        const fileInput = ref(null)
        const useBusinessPhoto = ref(false)
        const isValidated = ref(false)

        const {data: business, fetchBusiness, error: fetchBusinessError} = getBusiness(params.id)
        const {add} = addLocation()

        const {
            file,
            filePreview,
            handleChange,
            setFilePreview,
            error: fileError,
            clearFile
        } = useUpload()

        const { 
            uploadBusinessPhoto,
            filePath,
            url,
            error: uploadError
        } = useStorage()

        const validateFields = () => {
            const {
                name,
                address,
                info,
                placeholder
            } = formData.value

            if(name && address && info && placeholder) {
                isValidated.value = true
            } else {
                isValidated.value = false
            }
        }

        const alertInvalid = () => {
            alert('Please complete the form')
        }

        const addBusinessLocation = async () => {

            loading.value = true

            let photoUrl = null
            let photoFilePath = null

            if(useBusinessPhoto.value) {

                photoUrl = business.value.imageUrl
                photoFilePath = business.value.imagePath
                 
            } else {

                if(file.value) {

                    const firestorePath = 'covers/locations'
                    await uploadBusinessPhoto(firestorePath, file.value)
                    photoUrl = url.value
                    photoFilePath = filePath.value

                }  

            }

            await add({
                ...formData.value,
                businessId: params.id,
                imageUrl: photoUrl,
                imagePath: photoFilePath,
                useBusinessPhoto: useBusinessPhoto.value
            })
            
            loading.value = false
            clearFile()
            router.push({name: 'merchant-business'})
        }

        watch(formData.value, () => {
            validateFields()
        })

        watch(uploadError, () => {
            error.value = uploadError.value
        })

        watch(fileError, () => {
            error.value = fileError.value
        })

        watch(useBusinessPhoto, () => {
            if(useBusinessPhoto.value) {
                setFilePreview(business.value.imageUrl)
            } else {
                clearFile()
                fileInput.value.value = ''
            }
        })

        watchEffect(async () => {
            loading.value = true
            clearFile()
            await fetchBusiness()

            // formData.value.openingTime = business.value.openingTime
            // formData.value.closingTime = business.value.closingTime

            loading.value = false
        })

        return {
            formData,
            business,
            loading,
            isValidated,
            fetchBusinessError,
            useBusinessPhoto,
            fileInput,
            filePreview,
            addBusinessLocation,
            handleChange,
            alertInvalid
        }
    }
}

</script>

<style>
.input {
    width:100%; 
    padding: 10px;
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

.timerangepicker {
    display: flex; 
    justify-content: space-between; 
    align-items: baseline;
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
</style>