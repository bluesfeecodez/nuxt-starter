import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RichTextBlock from './RichTextBlock.vue'

describe('RichTextBlock', () => {
  it('renders HTML content via v-html', () => {
    const wrapper = mount(RichTextBlock, { props: { content: '<p>Hello</p>' } })
    expect(wrapper.find('p').text()).toBe('Hello')
  })
})
