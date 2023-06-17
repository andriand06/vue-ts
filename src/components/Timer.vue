<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue'
const displayDays: Ref<number | string> = ref(0)
const displayHours: Ref<number | string> = ref(0)
const displayMins: Ref<number | string> = ref(0)
const displaySecs: Ref<number | string> = ref(0)

const showTimeRemaining = () => {
  const timer = setInterval(() => {
    const now = new Date()
    const tomorrow = new Date(`2023, 6, ${now.getDate() + 1}`)
    const timeLeft = tomorrow.getTime() - now.getTime()
    if (timeLeft < 0) {
      clearInterval(timer)
      return
    }
    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour
    displayDays.value = Math.floor(timeLeft / day)
    displayHours.value = Math.floor((timeLeft % day) / hour)
    displayMins.value = Math.floor((timeLeft % hour) / minute)
    displaySecs.value = Math.floor((timeLeft % minute) / second)

    displayDays.value = displayDays.value < 10 ? `0${displayDays.value}` : displayDays.value
    displayHours.value = displayHours.value < 10 ? `0${displayHours.value}` : displayHours.value
    displayMins.value = displayMins.value < 10 ? `0${displayMins.value}` : displayMins.value
    displaySecs.value = displaySecs.value < 10 ? `0${displaySecs.value}` : displaySecs.value
  }, 1000)
}

onMounted(() => {
  showTimeRemaining()
})
</script>

<template>
  <div class="wrapper">
    {{ displayDays }}:{{ displayHours }}:{{ displayMins }}:{{ displaySecs }}
  </div>
</template>
