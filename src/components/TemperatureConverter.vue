<script setup lang="ts">
import type { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface'
import { ref } from 'vue'
//c = val * (9/5) + 32
//f = val - 32 * (5/9)
const fahrenheit = ref(0)
const celcius = ref(32)

const setF = (e: ChangeEvent) => {
  fahrenheit.value = parseFloat(e.target.value as string)
  celcius.value = parseFloat(e.target.value as string) * (9 / 5) + 32
}

const setC = (e: ChangeEvent) => {
  celcius.value = parseFloat(e.target.value as string)
  fahrenheit.value = (parseFloat(e.target.value as string) - 32) * (5 / 9)
}
</script>

<template>
  <a-form-item label="Fahrenheit">
    <a-input
      :value="fahrenheit"
      @change="setF"
      id="fahrenheit"
      type="number"
      name="fahrenheit"
    ></a-input>
  </a-form-item>
  <a-form-item label="Celcius">
    <a-input :value="celcius" @change="setC" id="celcius" type="number" name="celcius"></a-input>
  </a-form-item>
</template>
