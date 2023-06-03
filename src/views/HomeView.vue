<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useRoute } from 'vue-router'
import Counter from '../components/Counter.vue'
import CrudForm from '../components/CrudForm.vue'
import TemperatureConverter from '../components/TemperatureConverter.vue'
import FlightBooker from '../components/FlightBooker.vue'
import HelloWorld from '../components/HelloWorld.vue'
import { Transition } from 'vue'
interface Components {
  COUNTER: Component
  CRUD: Component
  TEMPERATURE_CONVERTER: Component
  FLIGHT_BOOKER: Component
}
const toggle = ref(false)

const components: Components = {
  COUNTER: Counter,
  CRUD: CrudForm,
  TEMPERATURE_CONVERTER: TemperatureConverter,
  FLIGHT_BOOKER: FlightBooker
}
const componentToRender = ref(components.COUNTER)
const routePath = useRoute().fullPath
</script>

<template>
  <main>
    <!-- see main.scss v-enter-* style -->
    <Transition><HelloWorld v-if="toggle" /></Transition>
    <a-button @click="toggle = !toggle">Toggle Hello World</a-button>
    <h1>Example Application Practice</h1>
    <section id="example-practice">
      <a-button @click="componentToRender = components.COUNTER">Counter</a-button>
      <a-button @click="componentToRender = components.CRUD">Crud</a-button>
      <a-button @click="componentToRender = components.TEMPERATURE_CONVERTER"
        >Temperature Converter</a-button
      >
      <a-button @click="componentToRender = components.FLIGHT_BOOKER">Flight Booker</a-button>
    </section>
    <component :is="componentToRender"></component>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

#example-practice {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
