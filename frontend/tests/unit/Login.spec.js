import Login from '@/components/Login.vue'
import Vue from 'vue'

describe('Login.vue', () => {
  it('renders correctly with username and password', () => {
    const Constructor = Vue.extend(Login);
    const LoginComponent = new Constructor().$mount();
    LoginComponent.username = 'rzotgorz'
    LoginComponent.password = '123456'
    const button = LoginComponent.$el.querySelector('el-button');
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    LoginComponent._watcher.run();
  })
})
