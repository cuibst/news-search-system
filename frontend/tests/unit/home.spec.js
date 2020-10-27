import home from '@/components/home.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import '../../src/plugins/element.js'

describe('homepage.vue', () => {
  it('renders correctly with default data', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(home, {
        router,
        localVue
      })
      const button = wrapper.find('button')
      button.trigger('click')  
  })
  it('renders correctly with these news data', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = shallowMount(home, {
      router,
      localVue,
    })
    wrapper.vm.goto('www.baidu.com')
    wrapper.vm.handleScrollx()
    expect(wrapper.find('.nav').exists()).toBe(true)
    wrapper.vm.handleScrollx(scroll, 300)
    await Vue.nextTick()
    expect(wrapper.find('.nav2').exists()).toBe(true)
    wrapper.vm.selectclass(2)
    expect(wrapper.vm.activenav).toBe(2)
    wrapper.vm.selectStyle(2)
    wrapper.vm.outStyle(2)
    expect(wrapper.vm.selactive).toBe(-1)
  })

})