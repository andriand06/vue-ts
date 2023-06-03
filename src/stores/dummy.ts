import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCounterStore } from './counter'

export const useDummyStore = defineStore('dummy', () => {
  const counterStore = useCounterStore()
  // ❌ This is not possible because counterStore setup also tries to read dummy.name in counter.ts
  counterStore.name

  function doSomething() {
    // ✅ Read x properties in computed or actions
    const counterStoreName = counterStore.name
    // ...
  }

  const name = ref('Dummy')

  return { name }
})
