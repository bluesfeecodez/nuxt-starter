import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GettingStartedPage from './GettingStartedPage.vue'

const page = {
  type: 'getting-started-page',
  slug: 'getting-started',
  title: 'Getting Started',
  intro: 'Follow these steps to get up and running.',
  steps: [
    { number: 1, title: 'Clone the repo', description: 'git clone ...' },
    { number: 2, title: 'Install dependencies', description: 'pnpm install' },
  ],
}

describe('GettingStartedPage', () => {
  it('renders the title', () => {
    const wrapper = mount(GettingStartedPage, { props: { page } })
    expect(wrapper.find('h1').text()).toBe('Getting Started')
  })

  it('renders the intro', () => {
    const wrapper = mount(GettingStartedPage, { props: { page } })
    expect(wrapper.text()).toContain('Follow these steps to get up and running.')
  })

  it('renders each step title', () => {
    const wrapper = mount(GettingStartedPage, { props: { page } })
    expect(wrapper.text()).toContain('Clone the repo')
    expect(wrapper.text()).toContain('Install dependencies')
  })
})
