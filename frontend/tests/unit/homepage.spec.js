import homepage from '@/components/homepage.vue'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import '../../src/plugins/element.js'

describe('homepage.vue', () => {
  it('renders correctly with default data', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(homepage, {
        router,
        localVue
      })
      const button = wrapper.find('button')
      button.trigger('click')  
  })
  it('renders correctly with these news data', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = shallowMount(homepage, {
      router,
      localVue,
    })
    wrapper.vm.goto('www.baidu.com')
  })

})