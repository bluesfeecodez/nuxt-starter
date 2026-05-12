import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HeroBlock from './HeroBlock.vue'

describe('HeroBlock', () => {
  const props = {
    heading: 'Hero Heading',
    subheading: 'Hero subheading text',
    ctaLabel: 'Get Started',
    ctaUrl: '/get-started',
  }

  it('renders the heading', () => {
    const wrapper = mount(HeroBlock, { props })
    expect(wrapper.find('h1').text()).toBe('Hero Heading')
  })

  it('renders the subheading', () => {
    const wrapper = mount(HeroBlock, { props })
    expect(wrapper.text()).toContain('Hero subheading text')
  })

  it('renders the CTA link with correct href and label', () => {
    const wrapper = mount(HeroBlock, { props })
    const link = wrapper.find('a')
    expect(link.text()).toBe('Get Started')
    expect(link.attributes('href')).toBe('/get-started')
  })
})
