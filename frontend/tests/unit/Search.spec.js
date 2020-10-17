import Search from '@/components/Search.vue'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import '../../src/plugins/element.js'

describe('Detail.vue', () => {
  it('renders correctly with these news data', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = shallowMount(Search, {
      router,
      localVue,
      propsData: {
        infolist: [
          {
            title: '罕见！解放军战机15小时内两度巡台震慑“台独”',
            img: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1828869589,1515035484&fm=173&app=49&size=f242,162&n=0&g=0n&f=JPEG?s=9696036D145366655E3261D00300C0BA&sec=1602984222&t=dc549355fa00b3f980ead19e192bf350',
            summary: '3小时前 编辑:曾印当“我国台湾地区,我是中国人民解放军,正在进行例行训练,请不要干扰我正常行动!台湾地区,我是中国人民解放军,正在进行例行训练,请不要干扰我...',
            pub_date: '2小时前',
            media: '环球网',
            news_url: 'https://baijiahao.baidu.com/s?id=1680688408975197474&wfr=spider&for=pc'
          }
        ]
      }
    })
    expect(wrapper.find('.titles').text()).toMatch('罕见！解放军战机15小时内两度巡台震慑“台独”')
  })
  it('renders correctly with these news data', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    router.push({ name: 'SearchResult', params: { keyword: '解放军' } })
    const wrapper = shallowMount(Search, {
      router,
      localVue,
      propsData: {
        infolist: [
          {
            title: '罕见！解放军战机15小时内两度巡台震慑“台独”',
            img: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1828869589,1515035484&fm=173&app=49&size=f242,162&n=0&g=0n&f=JPEG?s=9696036D145366655E3261D00300C0BA&sec=1602984222&t=dc549355fa00b3f980ead19e192bf350',
            summary: '3小时前 编辑:曾印当“我国台湾地区,我是中国人民解放军,正在进行例行训练,请不要干扰我正常行动!台湾地区,我是中国人民解放军,正在进行例行训练,请不要干扰我...',
            pub_date: '2小时前',
            media: '环球网',
            news_url: 'https://baijiahao.baidu.com/s?id=1680688408975197474&wfr=spider&for=pc'
          }
        ]
      }
    })
    expect(wrapper.find('.titles').text()).toMatch('罕见！解放军战机15小时内两度巡台震慑“台独”')
    wrapper.vm.goto('www.baidu.com')
  })
  it('renders correctly with these news data', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    router.push({ name: 'SearchResult', params: { keyword: '解放军' } })
    const wrapper = shallowMount(Search, {
      router,
      localVue
    })
    expect(wrapper.find('.titles').exists()).toBe(false)
  })
  it('renders correctly with the search button', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    router.push({ name: 'SearchResult', params: { keyword: '' } })
    const wrapper = mount(Search, {
      router,
      localVue
    })
    const button = wrapper.find('button')
    button.trigger('click')
  })
})
