import Login from '@/components/Login.vue'
import Vue from 'vue'
import '../../src/plugins/element.js'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'
import { mount } from '@vue/test-utils'

describe('Login.vue', () => {
  it('renders correctly with username and password', () => {
    const Constructor = Vue.extend(Login)
    const LoginComponent = new Constructor().$mount()
    LoginComponent.username = 'rzotgorz'
    LoginComponent.password = '123456'
    const button = LoginComponent.$el.querySelector('.el-button')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    LoginComponent._watcher.run()
  })
  it('User check successfully', async () => {
    const wrapper = mount(Login)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          code: 200,
          Token: 'Congratulations'
        },
        status: 200
      })
    })
    wrapper.setData({
      username: '1',
      password: '123'
    })
    button.trigger('click')
    await flushPromises()
  })
  it('Other Problems', async () => {
    const wrapper = mount(Login)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          code: 401
        },
        status: 200
      })
    })
    wrapper.setData({
      username: '12',
      password: '123'
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.username).toBe('12')
    expect(wrapper.vm.password).toBe('')
  })
  it('Handle with Network Failure', async () => {
    const wrapper = mount(Login)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.reject(Error('Network Failed'))
    })
    wrapper.setData({
      username: '12',
      password: '123'
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.username).toBe('12')
    expect(wrapper.vm.password).toBe('123')
  })
})
