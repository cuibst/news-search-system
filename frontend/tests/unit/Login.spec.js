import Login from '@/components/Login.vue'
import Vue from 'vue'

describe('Login.vue', () => {
  it('renders correctly with username and password', () => {
    const Constructor = Vue.extend(Login)
    const LoginComponent = new Constructor().$mount()
    LoginComponent.username = 'rzotgorz'
    LoginComponent.password = '123456'
    const button = LoginComponent.$el.querySelector('el-button')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    LoginComponent._watcher.run()
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
})
