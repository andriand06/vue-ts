import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { HelloPlugin } from './plugins/hello'
import { useCounterStore } from './counter'

const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(HelloPlugin)
  app.use(pinia)
  setActivePinia(pinia)
})

describe('Counter Store', () => {
  it('increment', () => {
    const counter = useCounterStore()
    counter.increment()
    expect(counter.count).toBe(1)
    expect(counter.doubleCount).toBe(2)
    expect(counter.doublePlusOne()).toBe(3)
  })

  it('reset', () => {
    const counter = useCounterStore()
    counter.increment()
    counter.$reset()
    expect(counter.count).toBe(0)
    expect(counter.doubleCount).toBe(0)
    expect(counter.doublePlusOne()).toBe(1)
  })
})
