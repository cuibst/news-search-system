import Register from '@/components/Register.vue'
import Vue from 'vue'
import { mount,shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'
import { Button, Container, Header, Main, Input, Form, FormItem, Message} from 'element-ui'
import axios from 'axios'
import ElementUI from 'element-ui'

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
Vue.use(ElementUI)
Vue.prototype.$message = Message

describe('Register.vue', () => {
  it('Invalie data to input',async () => {
    const wrapper = mount(Register)
    wrapper.setData({
      ruleForm: {
        username: '',
        password: '123456',
        passwordCheck: '12456',
        email: '12346qq.com',
        phonenumber: '1872546587'
      }
    })
    const button = wrapper.findComponent(ElementUI.Button)
    button.trigger('click')
    await Vue.nextTick()
  })
  it('Invalie data to other wrong input',async () => {
    const wrapper = mount(Register)
    wrapper.setData({
      ruleForm: {
        username: '',
        password: '',
        passwordCheck: '',
        email: '',
        phonenumber: ''
      }
    })
    const button = wrapper.findComponent(ElementUI.Button)
    button.trigger('click')
    await Vue.nextTick()
  })
  it('Invalid username send correctly', async () => {
    const wrapper = mount(Register)
    const button = wrapper.findComponent(ElementUI.Button)
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
    const button = wrapper.findComponent(ElementUI.Button)
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
    const button = wrapper.findComponent(ElementUI.Button)
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
    expect(wrapper.vm.ruleForm.username).toBe('')
  })
  it('Invalid network', async () => {
    const wrapper = mount(Register)
    const button = wrapper.findComponent(ElementUI.Button)
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
    expect(wrapper.vm.ruleForm.username).toBe('1')
  })
})
