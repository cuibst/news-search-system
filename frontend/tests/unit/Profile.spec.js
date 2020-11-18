import Profile from '@/components/Profile.vue'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'

describe('Profile.vue', () => {
  it('it renders data successfully', async () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          data: {
            likenews: [
              { news_id: 'xinhua_1125138244', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125138244.htm', title: '“景漂”青年：因瓷而来 为瓷添彩', source: 'xinhua', category: 'other', media: '新华网', tags: '景德镇,景漂,陶瓷,展览,协会,瓷博会', pub_date: '2019-10-23 09:39:28', summary: '在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。', img: 'empty', content: "['新华网南昌10月23日电（杨益民 王晓震）在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。18日，一年一度的景德镇瓷博会开幕。当日，景德镇景漂协会以“向上”为主题，打造了一场专题展览。展览呈现了景德镇景漂协会10位青年“景漂”设计师的陶瓷作品，探索景德镇陶瓷的“新玩法”。']" },
              { news_id: 'xinhua_1125137937', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125137937.htm', title: '因“瓷”结缘！“洋小伙”眼中的瓷博会', source: 'xinhua', category: 'other', media: '新华网', tags: '陶瓷,景德镇,爱好者,博览会', pub_date: '2019-10-23 11:19:01', summary: '来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。', img: 'empty', content: "['新华网南昌10月23日电（王晓震 杨益民）2019中国景德镇国际陶瓷博览会在千年瓷都景德镇举办，吸引了来自世界各地的陶瓷艺术爱好者前来参加。来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。']" },
              { news_id: 'qq_20201028A01PUD00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUD00.html', title: '华富物联基金净值上涨1.38％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,腾讯,沪深300指数,累计净值,净值增长率', pub_date: '2020-10-28 08:10:10', summary: '腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。华富物联基金近一周下跌1.74%，近……', img: 'empty', content: "['腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。', '华富物联基金近一周下跌1.74%，近一个月上涨5.22%，近一年上涨62.63%，基金成立以来累计上涨69.3%。', '华富物联基金成立于2016-01-21，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为陈奇。', '2020年半年报该基金实现收益473.06万元，报告期净值增长率为38.48%，报告期末基金份额总额为1005.73万份。']" },
              { news_id: 'xinhua_1125141813', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125141813.htm', title: '上车即入院！来看5G医联体急救转运车', source: 'xinhua', category: 'other', media: '新华网', tags: '附属医院,第一时间,南昌,设备,救护车,新一代,医联体,移动通信,物联网,大会', pub_date: '2019-10-23 16:22:31', summary: '在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', img: 'empty', content: "['新华网南昌10月23日电（王凯丰 王中庆）在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', '据介绍，车内通过5G、NB-IoT、eMTC等新一代宽带无线移动通信网技术，配备了物联网手环、高清影像设备、远程心电监护、医用AR眼镜等设备。只要患者上了救护车，医生就能第一时间开始治疗，实现“零时差”融合，做到了“上车即入院”。']" },
              { news_id: 'qq_20201028A01PUE00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUE00.html', title: '交银可转债C基金净值上涨1.58％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: 'c基金,可转债,基金,交银', pub_date: '2020-10-28 08:10:11', summary: '腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。交银可转债C基金近一周下……', img: 'empty', content: "['腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。', '交银可转债C基金近一周下跌0.28%，近一个月上涨3.68%，近一年上涨17.19%，基金成立以来累计上涨19.26%。', '交银可转债C基金成立于2019-07-11，业绩比较基准为10.0％×沪深300指数+20.0％×中债-综合指数-全价指数+70.0％×中证可转换债券指数。', '该基金基金经理为魏玉敏。', '2020年半年报该基金亏损3.3万元，报告期净值增长率为0.88%，报告期末基金份额总额为397.04万份。']" }
            ]
          }
        }
      })
    })
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          length: 0,
          data: [
            '解放军',
            '特朗普 拜登',
            '达拉崩吧版的贝蒂剥夺秘鲁问坤题库卡卡替考特苏瓦西拉送'
          ]
        }
      })
    })
    const localVue = createLocalVue()
    const routes = [
      {
        path: '/searchresult/:keyword',
        name: 'SearchResult'
      }
    ]
    const router = new VueRouter({
      routes
    })
    const wrapper = shallowMount(Profile, {
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
    await flushPromises()
    expect(wrapper.html()).toContain('b@bat.com')
    wrapper.vm.goto('https://www.meituan.com/')
  })
  it('Invalid network', async () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(Profile, {
      localVue,
      propsData: {
        user: {
          username: '1',
          phonenumber: '15756451234',
          email: 'b@bat.com'
        }
      }
    })
    await flushPromises()
    expect(JSON.stringify(wrapper.vm.likenews)).toBe('[]')
  })
})
