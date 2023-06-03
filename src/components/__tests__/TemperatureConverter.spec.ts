import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemperatureConverter from '../TemperatureConverter.vue'
import { Input } from 'ant-design-vue'

describe('When user A change value of fahrenheit nor celcius', () => {
  it('will convert with the correct formula', async () => {
    const wrapper = mount(TemperatureConverter, {
      global: {
        components: {
          'a-input': Input
        }
      }
    })
    const celcius = wrapper.find('#celcius')
    celcius.setValue(33.8)
    await celcius.trigger('change')
    const expectedFahrenheit = (parseFloat(wrapper.vm.celcius) - 32) * (5 / 9)
    expect(wrapper.vm.fahrenheit).toBe(expectedFahrenheit)
  })
})
