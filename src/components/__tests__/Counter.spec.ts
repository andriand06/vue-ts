import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import Counter from '../Counter.vue'
import { Button } from 'ant-design-vue'

describe('Counter functionality', () => {
  let wrapper: VueWrapper
  let countEl: DOMWrapper<Element>
  beforeEach(() => {
    wrapper = mount(Counter, {
      global: {
        components: {
          'a-button': Button
        }
      }
    })
    countEl = wrapper.find('#count')
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('when user A click increment, will fires increment event with the increment value', async () => {
    //vue test lib is async so need to do await here
    await wrapper.find('#increment-btn').trigger('click')
    expect(wrapper.vm.count).toBe(1)
    expect(parseInt(countEl.text())).toBe(1)
  })

  it('when user A click reset, will fires a reset event with value become 0', () => {
    wrapper.get('#reset-btn').trigger('click')
    expect(wrapper.vm.count).toBe(0)
    expect(parseInt(countEl.text())).toBe(0)
  })
})
