import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Sample from '@/components/Sample.vue'

describe('Sample.vue', () => {
  it('renders msg and get data from backend when clicked', function () {
    const wrapper = shallowMount(Sample)
    expect(wrapper.find('.message').text()).to.be.equal('hello')
    wrapper.find('button').trigger('click')
  })
})
