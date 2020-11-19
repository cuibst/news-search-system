import UserPage from '@/views/UserPage.vue'
import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI, { Button, Container, Header, Main, Input, Form, FormItem, Message } from 'element-ui'
import axios from 'axios'
import VueRouter from 'vue-router'
import store from '@/store'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'

Vue.prototype.$store = store
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

describe('User.vue', async () => {
  it('Invalie data to input', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(UserPage, {
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
    wrapper.vm.changeindex(1)
    wrapper.vm.resize()
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          code: 200,
          user: 'ryy'
        },
        status: 200
      })
    })
    wrapper.vm.getUser()
    await flushPromises()
  })
})
