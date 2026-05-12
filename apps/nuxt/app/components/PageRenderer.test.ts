import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PageRenderer from './PageRenderer.vue'

const contentPage = {
  type: 'content-page',
  title: 'Test Title',
  blocks: [],
}

const unknownPage = {
  type: 'unknown-xyz',
  title: 'Unknown',
}

describe('PageRenderer', () => {
  it('renders ContentPage for content-page type', () => {
    const wrapper = mount(PageRenderer, { props: { page: contentPage } })
    expect(wrapper.find('h2').text()).toBe('Test Title')
  })

  it('renders fallback for unknown page type', () => {
    const wrapper = mount(PageRenderer, { props: { page: unknownPage } })
    expect(wrapper.text()).toContain('Unknown page type')
  })
})
