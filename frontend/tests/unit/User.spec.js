import User from '@/components/User.vue'
import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'
import ElementUI, { Button, Container, Header, Main, Input, Form, FormItem, Message } from 'element-ui'
import axios from 'axios'
import VueRouter from 'vue-router'

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

describe('User.vue', () => {
  it('Invalie data to input', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
    wrapper.setData({
      ruleForm: {
        username: '',
        password: '123456',
        passwordCheck: '12456',
        email: '12346qq.com',
        phonenumber: '1872546587',
        oldpasswd: ''
      }
    })
    const button = wrapper.findComponent(ElementUI.Button)
    button.trigger('click')
    await Vue.nextTick()
  })
  it('Fail to check the information', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
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
        phonenumber: '18725846587',
        oldpasswd: '###'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.ruleForm.username).toBe('1')
  })
  it('Invalid network', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
    const button = wrapper.findComponent(ElementUI.Button)
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.reject(new Error('Network error'))
    })
    wrapper.setData({
      ruleForm: {
        username: '123',
        password: '123456',
        passwordCheck: '123456',
        email: '123456@qq.com',
        phonenumber: '18725846587'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.ruleForm.username).toBe('123')
  })
  it('Invalie data to other wrong input', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
    wrapper.setData({
      ruleForm: {
        username: '',
        password: '',
        passwordCheck: '',
        email: '',
        phonenumber: '',
        oldpasswd: ''
      }
    })
    const button = wrapper.findComponent(ElementUI.Button)
    button.trigger('click')
    await Vue.nextTick()
  })
  it('Invalid username send correctly', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
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
        phonenumber: '18725846587',
        oldpasswd: '123'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.ruleForm.username).toBe('1')
  })
  it('Valid username send correctly', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
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
        phonenumber: '18725846587',
        oldpasswd: '11233'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect('1').toEqual('1')
  })
  it('Valid username without new password', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(User, {
      router,
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
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
        password: '',
        passwordCheck: '',
        email: '123456@qq.com',
        phonenumber: '18725846587',
        oldpasswd: '123'
      }
    })
    button.trigger('click')
    await flushPromises()
    expect('1').toEqual('1')
  })
})
