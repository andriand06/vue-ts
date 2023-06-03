import { describe, it, expect, vi, beforeEach, afterEach, type SpyInstance } from 'vitest'
import { DOMWrapper, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import FlightBookerVue from '../FlightBooker.vue'
import { Button, DatePicker } from 'ant-design-vue'

describe('FlightBooker', () => {
  let wrapper: VueWrapper
  let departureDate: Date
  let departureDatePicker: DOMWrapper<Element>
  let returnDatePicker: DOMWrapper<Element>
  let bookButton: DOMWrapper<Element>
  beforeEach(() => {
    wrapper = mount(FlightBookerVue, {
      global: {
        components: {
          'a-button': Button,
          'a-date-picker': DatePicker
        }
      },
      data() {
        return {
          departureDate: null
        }
      }
    })
    wrapper.find('#flight-type').setValue('2')
    departureDate = new Date()
    departureDatePicker = wrapper.find('#departure-date')
    returnDatePicker = wrapper.find('#return-date')
    bookButton = wrapper.find('#book-btn')
    departureDatePicker.element.innerHTML = departureDate.toDateString()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('user A select one-way flight, select a date and click book will show alert of flight is booked', async () => {
    await bookButton.trigger('click')
  })

  it('user A select return flight and select return date <= departure date', async () => {
    returnDatePicker.element.innerHTML = departureDate.toDateString()
    await returnDatePicker.trigger('change')
    expect(bookButton.element.hasAttribute('disabled')).toBeTruthy()
    expect(wrapper.find('p').text()).toMatch('Return date must be after departure date.')
  })

  it('user A select return flight and select return date > departure date', async () => {
    returnDatePicker.element.innerHTML = new Date(departureDate.getTime() + 86400000).toDateString()
    await returnDatePicker.trigger('change')
    await bookButton.trigger('click')
  })
})
