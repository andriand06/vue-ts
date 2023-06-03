import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Counter from '../Counter.vue'
import { Button } from 'ant-design-vue'
import { createTestingPinia } from '@pinia/testing'
import { useCounterStore } from '../../stores/counter'
import { HelloPlugin } from '../../stores/plugins/hello'
describe('Counter functionality & interaction with counter store', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(Counter, {
      global: {
        components: {
          'a-button': Button
        },
        plugins: [
          createTestingPinia({
            initialState: {
              //set our counter store initial state
              counter: { count: 1 }
            },
            //mock and spy all our actions
            createSpy: vi.fn,
            //load pinia plugin in component spec is different from store spec
            plugins: [HelloPlugin]
          })
        ]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('when user A click increment, will fires increment event with the increment value', async () => {
    const store = useCounterStore()
    //vue test lib is async so need to do await here
    await wrapper.find('#increment-btn').trigger('click')
    expect(store.hello).toMatch('world')
    //already spyOn so we just need to expect
    expect(store.increment).toHaveBeenCalledTimes(1)
  })

  it('when user A click reset, will fires a reset event with value become 0', async () => {
    const store = useCounterStore()
    await wrapper.get('#reset-btn').trigger('click')
    expect(store.$reset).toHaveBeenCalledTimes(1)
  })
})
