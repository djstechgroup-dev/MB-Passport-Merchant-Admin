<template>
    <select class="day-selector" :value="day" @change="handleDay">
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wenesday">Wenesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
    </select>

    <Datepicker 
        inputClassName="dp-custom-input"
        timePicker 
        :value="time"
        :clearable="false" 
        :is24="false"
        />
    
</template>

<script>
import {ref} from 'vue'
import Datepicker from '@vuepic/vue-datepicker'

export default {
name: 'DayTimePicker',
components: {
    Datepicker
},
setup() {

    const day = ref('Sunday')
    const time = ref({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    })

    const handleDay = e => {
        //context.emit('update:day', e.target.value)
        day.value = e.target.value
    }

    const handleTime = e => {
        console.log(e)
        //context.emit('update:time', e)
        time.value = e
    }

    return {
        day,
        time,
        handleTime,
        handleDay
    }
}
}
</script>

<style scoped>
    .day-time-picker {
        display: flex; 
        border: 1px solid gray; 
        padding: 0 5px;
    }

    .day-selector {
        border: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
</style>