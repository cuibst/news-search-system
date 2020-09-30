import { shallowMount } from '@vue/test-utils'
import Sample from '@/components/Sample.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Sample)
    expect(wrapper.find('.message').text()).toMatch('hello')
    wrapper.find('button').trigger('click')
  })
})
