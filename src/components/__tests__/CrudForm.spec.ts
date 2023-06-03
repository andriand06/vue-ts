import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import CrudForm from '../CrudForm.vue'
import { Button, InputSearch, Input } from 'ant-design-vue'
describe('Crud functionality', () => {
  let wrapper: VueWrapper
  let select: DOMWrapper<Element>
  let optionsLength: number
  beforeEach(() => {
    wrapper = mount(CrudForm, {
      global: {
        components: {
          'a-button': Button,
          'a-input-search': InputSearch,
          'a-input': Input
        }
      }
    })
    select = wrapper.find('#employee-list')
    optionsLength = select.element.children.length
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('add new employee', async () => {
    wrapper.find('#first-name').setValue('Test')
    wrapper.find('#last-name').setValue('Employee')
    await wrapper.find('#create-btn').trigger('click')
    expect(select.element.children.length).toBeGreaterThan(optionsLength)
    expect(select.get('[value="3"]').text()).toMatch('Test , Employee')
  })

  it('update the selected employee in the select box', async () => {
    select.setValue(1)
    wrapper.find('#first-name').setValue('Ian')
    wrapper.find('#last-name').setValue('Davinta')
    await wrapper.find('#update-btn').trigger('click')
    expect(select.element.children.length).toBe(optionsLength)
    expect(select.get('[value="1"]').text()).toMatch('Ian , Davinta')
  })

  it('remove the selected employee in the select box', async () => {
    select.setValue(2)
    await wrapper.find('#delete-btn').trigger('click')
    expect(select.element.children.length).toBe(1)
  })
})
