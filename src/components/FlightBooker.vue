<script setup lang="ts">
import { ref, type Ref, computed } from 'vue'
import { notification } from 'ant-design-vue'
const flightType = ref('1')
const departureDate: Ref<string | null> = ref(null)
const returnDate: Ref<string | null> = ref(null)
const isReturn = computed(() => flightType.value === '2')
const canBook = computed(
  () =>
    !isReturn.value ||
    new Date(returnDate.value as string) > new Date(departureDate.value as string)
)
const book = () => {
  notification.success({
    message: 'Successfully book',
    description: isReturn.value
      ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
      : `You have booked a one-way flight leaving on ${departureDate.value}.`,
    duration: 5
  })
}
</script>
<template>
  <select name="flight-type" id="flight-type" v-model="flightType">
    <option value="1">One-way Flight</option>
    <option value="2">Return Flight</option>
  </select>
  <a-date-picker
    v-model:value="departureDate"
    :show-time="{ format: 'HH:mm' }"
    format="DD-MM-YYYY HH:mm"
    id="departure-date"
  ></a-date-picker>
  <a-date-picker
    v-model:value="returnDate"
    :show-time="{ format: 'HH:mm' }"
    format="DD-MM-YYYY HH:mm"
    id="return-date"
    :disabled="!isReturn"
  ></a-date-picker>
  <a-button :disabled="!canBook" @click="book" id="book-btn">Book</a-button>
  <p>{{ canBook ? '' : 'Return date must be after departure date.' }}</p>
</template>

<style scoped>
p {
  color: red;
}
</style>
