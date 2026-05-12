import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders the label prop', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Click me' } })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies primary class for variant="primary"', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Btn', variant: 'primary' } })
    expect(wrapper.classes()).toContain('btn--primary')
  })

  it('applies secondary class for variant="secondary"', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Btn', variant: 'secondary' } })
    expect(wrapper.classes()).toContain('btn--secondary')
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Btn', disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
