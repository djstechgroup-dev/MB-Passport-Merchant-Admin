<template>
    <Datepicker 
    timePicker 
    :value="time"
    :clearable="false" 
    :is24="false"
    @update:modelValue="handleTime" 
    />
</template>

<script>
import {ref} from 'vue'
import Datepicker from '@vuepic/vue-datepicker'

export default {
    name: 'TimePicker',
    props: {
    },
    components: {
        Datepicker
    },
    setup(props) {

        const time = ref({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        })
        const handleTime = e => {
            time.value = e
        }

        return {
            time,
            handleTime
        }
    }
}
</script>