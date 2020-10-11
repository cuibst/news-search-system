import Register from '@/components/Register.vue'
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'
import { Button, Container, Main, Header, Input, Form, FormItem, Message } from 'element-ui'
import axios from 'axios'

axios.defaults.baseURL = 'api/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$message = Message

describe('Register.vue', () => {
  it('renders correctly with these inputs', () => {
    const Constructor = Vue.extend(Register)
    const RegisterComponent = new Constructor().$mount()
    RegisterComponent.ruleForm.username = 'rzotgorz'
    RegisterComponent.ruleForm.password = '123456'
    RegisterComponent.ruleForm.passwordCheck = '123456'
    RegisterComponent.ruleForm.email = '123456@qq.com'
    RegisterComponent.ruleForm.phonenumber = '18725846587'
    const button = RegisterComponent.$el.querySelector('.el-button')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    RegisterComponent._watcher.run()
  })
  it('Invalid username send correctly', async () => {
    const wrapper = mount(Register)
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
      ruleForm: {
        username: '1',
        password: '123456',
        passwordCheck: '123456',
        email: '123456@qq.com',
        phonenumber: '18725846587'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.ruleForm.username).toBe('')
  })
  it('Valid username send correctly', async () => {
    const wrapper = mount(Register)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          code: 200
        },
        status: 200
      })
    })
    wrapper.setData({
      ruleForm: {
        username: '1',
        password: '123456',
        passwordCheck: '123456',
        email: '123456@qq.com',
        phonenumber: '18725846587'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect('1').toEqual('1')
  })
  it('Fail to check the information', async () => {
    const wrapper = mount(Register)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          code: 402
        },
        status: 200
      })
    })
    wrapper.setData({
      ruleForm: {
        username: '1',
        password: '123456',
        passwordCheck: '123456',
        email: '123456@qq.com',
        phonenumber: '18725846587'
      }
    })
    button.trigger('click')
    await flushPromises()
    console.log(wrapper.html)
    expect(wrapper.vm.ruleForm.username).toBe('')
  })
  it('Invalid network', async () => {
    const wrapper = mount(Register)
    const button = wrapper.find('button')
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.reject(new Error('Network error'))
    })
    wrapper.setData({
      ruleForm: {
        username: '1',
        password: '123456',
        passwordCheck: '123456',
        email: '123456@qq.com',
        phonenumber: '18725846587'
      }
    })
    button.trigger('click')
    await flushPromises()
    console.log(wrapper.html)
    expect(wrapper.vm.ruleForm.username).toBe('1')
  })
})
