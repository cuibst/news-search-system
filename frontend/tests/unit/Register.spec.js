import Register from '@/components/Register.vue'
import Vue from 'vue'

describe('Register.vue', () => {
  it('renders correctly with these inputs', () => {
    const Constructor = Vue.extend(Register);
    const RegisterComponent = new Constructor().$mount();
    RegisterComponent.ruleForm.username = 'rzotgorz'
    RegisterComponent.ruleForm.password = '123456'
    RegisterComponent.ruleForm.secondpassword = '123456'
    RegisterComponent.ruleForm.email = '123456@qq.com'
    RegisterComponent.ruleForm.phonenumber = '18725846587'
    const button = RegisterComponent.$el.querySelector('el-button');
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    RegisterComponent._watcher.run();
  })
})
