import Register from '@/components/Register.vue'
import Vue from 'vue'

describe('Register.vue', () => {
  it('renders correctly with these inputs', () => {
    const Constructor = Vue.extend(Register);
    const RegisterComponent = new Constructor().$mount();
    RegisterComponent.username = 'rzotgorz'
    RegisterComponent.password = '123456'
    RegisterComponent.secondpassword = '123456'
    RegisterComponent.email = '123456@qq.com'
    RegisterComponent.phonenumber = '18725846587'
    const button = RegisterComponent.$el.querySelector('el-button');
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    RegisterComponent._watcher.run();
  })
})
