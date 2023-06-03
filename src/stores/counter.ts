import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDummyStore } from './dummy'
export const useCounterStore = defineStore('counter', () => {
  const dummy = useDummyStore()
  /**
   * Composing stores is about having stores that use each other, and this is supported in Pinia. There is one rule to follow:
   * 1. If two or more stores use each other, they cannot create an infinite loop through getters or actions. They cannot both directly read each other state in
   * their setup function:
   */
  // ❌ This is not possible because dummy also tries to read counterStore.name in dummy.ts
  dummy.name
  function doSomething() {
    // ✅ Read y properties in computed or actions
    const dummyName = dummy.name
    // ...
  }

  const name = ref('Counter')
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const doublePlusOne = () => doubleCount.value + 1
  function increment() {
    count.value++
  }
  function $reset() {
    count.value = 0
  }

  return { name, count, doubleCount, increment, $reset, doublePlusOne }
})
