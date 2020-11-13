import home from '@/components/home.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import '../../src/plugins/element.js'
import flushPromises from 'flush-promises'
import mockAxios from '../__mocks__/axios'
import store from '@/store'

Vue.prototype.$store = store

describe('homepage.vue', () => {
  it('deal correctly with network failure', async () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.reject(Error('Network Failure'))
    })
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = shallowMount(home, {
      router,
      localVue
    })
    await flushPromises()
    expect(JSON.stringify(wrapper.vm.imgnews)).toBe('[]')
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.reject(Error('Network Failure'))
    })
    wrapper.vm.selectclass(1)
    console.log('This is network failure' + wrapper.vm.textnews)
    await flushPromises()
    expect(JSON.stringify(wrapper.vm.textnews)).toBe('[]')
  })
  it('renders correctly with these news data', async () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          data: {
            imgnews: [
              { news_id: 'xinhua_1125138244', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125138244.htm', title: '“景漂”青年：因瓷而来 为瓷添彩', source: 'xinhua', category: 'other', media: '新华网', tags: '景德镇,景漂,陶瓷,展览,协会,瓷博会', pub_date: '2019-10-23 09:39:28', summary: '在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。', img: 'empty', content: "['新华网南昌10月23日电（杨益民 王晓震）在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。18日，一年一度的景德镇瓷博会开幕。当日，景德镇景漂协会以“向上”为主题，打造了一场专题展览。展览呈现了景德镇景漂协会10位青年“景漂”设计师的陶瓷作品，探索景德镇陶瓷的“新玩法”。']" },
              { news_id: 'xinhua_1125137937', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125137937.htm', title: '因“瓷”结缘！“洋小伙”眼中的瓷博会', source: 'xinhua', category: 'other', media: '新华网', tags: '陶瓷,景德镇,爱好者,博览会', pub_date: '2019-10-23 11:19:01', summary: '来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。', img: 'empty', content: "['新华网南昌10月23日电（王晓震 杨益民）2019中国景德镇国际陶瓷博览会在千年瓷都景德镇举办，吸引了来自世界各地的陶瓷艺术爱好者前来参加。来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。']" },
              { news_id: 'qq_20201028A01PUD00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUD00.html', title: '华富物联基金净值上涨1.38％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,腾讯,沪深300指数,累计净值,净值增长率', pub_date: '2020-10-28 08:10:10', summary: '腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。华富物联基金近一周下跌1.74%，近……', img: 'empty', content: "['腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。', '华富物联基金近一周下跌1.74%，近一个月上涨5.22%，近一年上涨62.63%，基金成立以来累计上涨69.3%。', '华富物联基金成立于2016-01-21，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为陈奇。', '2020年半年报该基金实现收益473.06万元，报告期净值增长率为38.48%，报告期末基金份额总额为1005.73万份。']" },
              { news_id: 'xinhua_1125141813', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125141813.htm', title: '上车即入院！来看5G医联体急救转运车', source: 'xinhua', category: 'other', media: '新华网', tags: '附属医院,第一时间,南昌,设备,救护车,新一代,医联体,移动通信,物联网,大会', pub_date: '2019-10-23 16:22:31', summary: '在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', img: 'empty', content: "['新华网南昌10月23日电（王凯丰 王中庆）在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', '据介绍，车内通过5G、NB-IoT、eMTC等新一代宽带无线移动通信网技术，配备了物联网手环、高清影像设备、远程心电监护、医用AR眼镜等设备。只要患者上了救护车，医生就能第一时间开始治疗，实现“零时差”融合，做到了“上车即入院”。']" },
              { news_id: 'qq_20201028A01PUE00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUE00.html', title: '交银可转债C基金净值上涨1.58％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: 'c基金,可转债,基金,交银', pub_date: '2020-10-28 08:10:11', summary: '腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。交银可转债C基金近一周下……', img: 'empty', content: "['腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。', '交银可转债C基金近一周下跌0.28%，近一个月上涨3.68%，近一年上涨17.19%，基金成立以来累计上涨19.26%。', '交银可转债C基金成立于2019-07-11，业绩比较基准为10.0％×沪深300指数+20.0％×中债-综合指数-全价指数+70.0％×中证可转换债券指数。', '该基金基金经理为魏玉敏。', '2020年半年报该基金亏损3.3万元，报告期净值增长率为0.88%，报告期末基金份额总额为397.04万份。']" }],
            textnews: [
              { news_id: 'xinhua_1126347612', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347612.htm', title: '血压高，散步别太快', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '人们常说“饭后走一走，活到九十九”。', img: 'empty' },
              { news_id: 'qq_20201028A01PV400', news_url: 'https://new.qq.com/omn/20201028/20201028A01PV400.html', title: '城市服务：物管下一个风口？', source: 'qq', category: 'house', media: '乐居财经', tags: '物业公司,碧桂园服务,保利物业,万科物业,西塘镇,物业管理', pub_date: '2020-10-28 08:10:13', summary: '乐居财经 徐酒眠 发自上海物企业务边界进一步拓展，从社区住宅与商业转向城市公共服务。10月26日，新大正（002968）物业就此前变更募集资金用于收购事项，回复深交所关注函表示，随着物业……', img: 'empty' },
              { news_id: 'qq_20201028A01PXC00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PXC00.html', title: '钓了三十多年板鲫，至今发现，这三大调整特管用，秋钓不试就亏了', source: 'qq', category: 'life', media: '钓鱼人之行', tags: '秋钓,鲫鱼,野钓,饵料', pub_date: '2020-10-28 10:56:28', summary: '随着气温的不断下降，水温变的越来越低，此时要想在户外钓好鲫鱼和鲤鱼，就要根据鱼情和天气变化来调整作钓方法。虽然本人称不上是老钓手，但以三十多年的野钓经验，觉得天气越冷，大板鲫反而越好钓，只不过前提条……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000' },
              { news_id: 'xinhua_1126347577', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347577.htm', title: '运动让眼睛变明亮', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '生命在于运动，锻炼不仅健体，还能明目。', img: 'empty' },
              { news_id: 'qq_20201028A01PVG00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVG00.html', title: '泰信互联网基金净值上涨1.37％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,泰信,腾讯,沪深300指数,累计净值', pub_date: '2020-10-28 08:10:13', summary: '腾讯基金10月27日讯，泰信互联网基金（代码001978）公布最新净值，数据显示，泰信互联网净值上涨1.37%。本基金单位净值为1.623元，累计净值为1.623元。泰信互联网基金近一周下跌2.11……', img: 'empty' },
              { news_id: 'xinhua_1125921046', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921046.htm', title: '购房补贴全部发放 契税补贴暂不考虑', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '购房者期盼2016年施行的鼓励购房举措及时落地，抚州市临川区相关部门给说法。', img: 'empty' },
              { news_id: 'qq_20201028A01PVK00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVK00.html', title: '长盛创新基金净值上涨1.27％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,长盛', pub_date: '2020-10-28 08:10:14', summary: '腾讯基金10月27日讯，长盛创新基金（代码004745）公布最新净值，数据显示，长盛创新净值上涨1.27%。本基金单位净值为1.5107元，累计净值为1.5107元。长盛创新基金近一周下跌1.11%……', img: 'empty' },
              { news_id: 'xinhua_1125921005', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921005.htm', title: '给住宅楼加装电梯 这里的居民办成了', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '加装电梯，筹集资金也是关键的一步。', img: 'http://www.jx.xinhuanet.com/2020-04/29/1125921005_15881220717831n.jpg' },
              { news_id: 'qq_20201028A01PVM00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVM00.html', title: '弘阳服务：曾焕沙物业掘金14亿｜物业造富', source: 'qq', category: 'finance', media: '乐居财经', tags: '弘阳服务,曾焕沙,物业,弘阳地产,弘阳集团', pub_date: '2020-10-28 08:10:14', summary: '编者按：31家上市物企，超过7成发布了股权激励计划。不同企业的激励方案有何特色，成效如何？上市造就多少富豪？乐居财经“物业造富”系列，解码物企股权激励和造富生态。本期关注弘阳服务。乐居财经 ……', img: 'empty' },
              { news_id: 'xinhua_1125906738', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125906738.htm', title: 'LPR迎史上最大降息——你的房贷少还多少', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 10:31:46', summary: '4月，LPR迎来史上最大幅度的降息。', img: 'empty' },
              { news_id: 'qq_20201028A01PW100', news_url: 'https://new.qq.com/omn/20201028/20201028A01PW100.html', title: '华夏军工安全基金净值上涨1.02％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,华夏', pub_date: '2020-10-28 08:10:17', summary: '腾讯基金10月27日讯，华夏军工安全基金（代码002251）公布最新净值，数据显示，华夏军工安全净值上涨1.02%。本基金单位净值为1.384元，累计净值为1.384元。华夏军工安全基金近一周下跌4……', img: 'empty' },
              { news_id: 'qq_20201028A01PVP00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVP00.html', title: '快讯：蓝城物业刘新廷提名参选2020中国物业经理人100强', source: 'qq', category: 'house', media: '乐居财经', tags: '蓝城,物业公司,刘新廷,物业经理', pub_date: '2020-10-28 08:10:14', summary: '乐居财经讯由乐居财经主办，新浪财经、中国企业家、中房网、中物研协联合主办的“行稳致远——2020（第四届）中国物业经理人评选”网络报名正式启动。2020年10月28日，蓝城物业服务有限公司物业总……', img: 'empty' },
              { news_id: 'xinhua_1125905988', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905988.htm', title: '市场分化增速放缓 地价近十年来首降', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '受新冠肺炎疫情影响，土地市场在放缓的同时渐趋分化。', img: 'empty' },
              { news_id: 'qq_20201028A01PVR00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVR00.html', title: '扎区开展纪念中国人民志愿军抗美援朝出国作战70周年系列活动', source: 'qq', category: 'edu', media: '魅力满洲里', tags: '退役军人事务局,扎赉诺尔区,抗美援朝战争,中国人民志愿军', pub_date: '2020-10-28 08:08:49', summary: '铭记英雄伟绩，矢志强军兴军。10月26日，扎赉诺尔区退役军人事务局与区人民武装部联合组织开展了纪念中国人民志愿军抗美援朝出国作战70周年系列活动，传承革命精神。座谈中，扎赉诺尔区退役军人事务局负责人……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681290511/1000' },
              { news_id: 'xinhua_1125905994', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905994.htm', title: '公租房违规首次纳入银行征信系统', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '近日，广东省住房和城乡建设厅与人民银行广州分行签订了《合作备忘录》，首次将公租房违规信息纳入人民银行征信系统。', img: 'empty' },
              { news_id: 'qq_20201028A01PVT00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVT00.html', title: '保定检法联手 力促行政争议实质性化解', source: 'qq', category: 'politics', media: '河北检察', tags: '保定,保定市检察院,涿州市', pub_date: '2020-10-28 08:09:33', summary: '河北检察公众号ID：hbsjcy近日，保定市检察院、保定市中级法院与涿州市检察院、涿州市法院以及保定莲池区法院组成联合办案组，针对一起工商行政登记纠纷行政争议案件，在涿州市行政争议化解中心召开行政争……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681291106/1000' }
            ]
          }
        }
      })
    })
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = shallowMount(home, {
      router,
      localVue
    })
    await flushPromises()
    wrapper.vm.handleScrollx()
    expect(wrapper.find('.nav').exists()).toBe(true)
    wrapper.vm.handleScrollx(scroll, 300)
    await Vue.nextTick()
    expect(wrapper.find('.nav2').exists()).toBe(true)
    wrapper.vm.selectStyle(2)
    wrapper.vm.outStyle(2)
    expect(wrapper.vm.selactive).toBe(-1)
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          data: {
            imgnews: [
              { news_id: 'xinhua_1125138244', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125138244.htm', title: '“景漂”青年：因瓷而来 为瓷添彩', source: 'xinhua', category: 'other', media: '新华网', tags: '景德镇,景漂,陶瓷,展览,协会,瓷博会', pub_date: '2019-10-23 09:39:28', summary: '在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。', img: 'empty', content: "['新华网南昌10月23日电（杨益民 王晓震）在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。18日，一年一度的景德镇瓷博会开幕。当日，景德镇景漂协会以“向上”为主题，打造了一场专题展览。展览呈现了景德镇景漂协会10位青年“景漂”设计师的陶瓷作品，探索景德镇陶瓷的“新玩法”。']" },
              { news_id: 'xinhua_1125137937', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125137937.htm', title: '因“瓷”结缘！“洋小伙”眼中的瓷博会', source: 'xinhua', category: 'other', media: '新华网', tags: '陶瓷,景德镇,爱好者,博览会', pub_date: '2019-10-23 11:19:01', summary: '来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。', img: 'empty', content: "['新华网南昌10月23日电（王晓震 杨益民）2019中国景德镇国际陶瓷博览会在千年瓷都景德镇举办，吸引了来自世界各地的陶瓷艺术爱好者前来参加。来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。']" },
              { news_id: 'qq_20201028A01PUD00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUD00.html', title: '华富物联基金净值上涨1.38％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,腾讯,沪深300指数,累计净值,净值增长率', pub_date: '2020-10-28 08:10:10', summary: '腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。华富物联基金近一周下跌1.74%，近……', img: 'empty', content: "['腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。', '华富物联基金近一周下跌1.74%，近一个月上涨5.22%，近一年上涨62.63%，基金成立以来累计上涨69.3%。', '华富物联基金成立于2016-01-21，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为陈奇。', '2020年半年报该基金实现收益473.06万元，报告期净值增长率为38.48%，报告期末基金份额总额为1005.73万份。']" },
              { news_id: 'xinhua_1125141813', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125141813.htm', title: '上车即入院！来看5G医联体急救转运车', source: 'xinhua', category: 'other', media: '新华网', tags: '附属医院,第一时间,南昌,设备,救护车,新一代,医联体,移动通信,物联网,大会', pub_date: '2019-10-23 16:22:31', summary: '在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', img: 'empty', content: "['新华网南昌10月23日电（王凯丰 王中庆）在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', '据介绍，车内通过5G、NB-IoT、eMTC等新一代宽带无线移动通信网技术，配备了物联网手环、高清影像设备、远程心电监护、医用AR眼镜等设备。只要患者上了救护车，医生就能第一时间开始治疗，实现“零时差”融合，做到了“上车即入院”。']" },
              { news_id: 'qq_20201028A01PUE00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUE00.html', title: '交银可转债C基金净值上涨1.58％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: 'c基金,可转债,基金,交银', pub_date: '2020-10-28 08:10:11', summary: '腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。交银可转债C基金近一周下……', img: 'empty', content: "['腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。', '交银可转债C基金近一周下跌0.28%，近一个月上涨3.68%，近一年上涨17.19%，基金成立以来累计上涨19.26%。', '交银可转债C基金成立于2019-07-11，业绩比较基准为10.0％×沪深300指数+20.0％×中债-综合指数-全价指数+70.0％×中证可转换债券指数。', '该基金基金经理为魏玉敏。', '2020年半年报该基金亏损3.3万元，报告期净值增长率为0.88%，报告期末基金份额总额为397.04万份。']" }],
            textnews: [
              { news_id: 'xinhua_1126347612', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347612.htm', title: '血压高，散步别太快', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '人们常说“饭后走一走，活到九十九”。', img: 'empty' },
              { news_id: 'qq_20201028A01PV400', news_url: 'https://new.qq.com/omn/20201028/20201028A01PV400.html', title: '城市服务：物管下一个风口？', source: 'qq', category: 'house', media: '乐居财经', tags: '物业公司,碧桂园服务,保利物业,万科物业,西塘镇,物业管理', pub_date: '2020-10-28 08:10:13', summary: '乐居财经 徐酒眠 发自上海物企业务边界进一步拓展，从社区住宅与商业转向城市公共服务。10月26日，新大正（002968）物业就此前变更募集资金用于收购事项，回复深交所关注函表示，随着物业……', img: 'empty' },
              { news_id: 'qq_20201028A01PXC00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PXC00.html', title: '钓了三十多年板鲫，至今发现，这三大调整特管用，秋钓不试就亏了', source: 'qq', category: 'life', media: '钓鱼人之行', tags: '秋钓,鲫鱼,野钓,饵料', pub_date: '2020-10-28 10:56:28', summary: '随着气温的不断下降，水温变的越来越低，此时要想在户外钓好鲫鱼和鲤鱼，就要根据鱼情和天气变化来调整作钓方法。虽然本人称不上是老钓手，但以三十多年的野钓经验，觉得天气越冷，大板鲫反而越好钓，只不过前提条……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000' },
              { news_id: 'xinhua_1126347577', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347577.htm', title: '运动让眼睛变明亮', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '生命在于运动，锻炼不仅健体，还能明目。', img: 'empty' },
              { news_id: 'qq_20201028A01PVG00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVG00.html', title: '泰信互联网基金净值上涨1.37％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,泰信,腾讯,沪深300指数,累计净值', pub_date: '2020-10-28 08:10:13', summary: '腾讯基金10月27日讯，泰信互联网基金（代码001978）公布最新净值，数据显示，泰信互联网净值上涨1.37%。本基金单位净值为1.623元，累计净值为1.623元。泰信互联网基金近一周下跌2.11……', img: 'empty' },
              { news_id: 'xinhua_1125921046', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921046.htm', title: '购房补贴全部发放 契税补贴暂不考虑', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '购房者期盼2016年施行的鼓励购房举措及时落地，抚州市临川区相关部门给说法。', img: 'empty' },
              { news_id: 'qq_20201028A01PVK00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVK00.html', title: '长盛创新基金净值上涨1.27％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,长盛', pub_date: '2020-10-28 08:10:14', summary: '腾讯基金10月27日讯，长盛创新基金（代码004745）公布最新净值，数据显示，长盛创新净值上涨1.27%。本基金单位净值为1.5107元，累计净值为1.5107元。长盛创新基金近一周下跌1.11%……', img: 'empty' },
              { news_id: 'xinhua_1125921005', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921005.htm', title: '给住宅楼加装电梯 这里的居民办成了', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '加装电梯，筹集资金也是关键的一步。', img: 'http://www.jx.xinhuanet.com/2020-04/29/1125921005_15881220717831n.jpg' },
              { news_id: 'qq_20201028A01PVM00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVM00.html', title: '弘阳服务：曾焕沙物业掘金14亿｜物业造富', source: 'qq', category: 'finance', media: '乐居财经', tags: '弘阳服务,曾焕沙,物业,弘阳地产,弘阳集团', pub_date: '2020-10-28 08:10:14', summary: '编者按：31家上市物企，超过7成发布了股权激励计划。不同企业的激励方案有何特色，成效如何？上市造就多少富豪？乐居财经“物业造富”系列，解码物企股权激励和造富生态。本期关注弘阳服务。乐居财经 ……', img: 'empty' },
              { news_id: 'xinhua_1125906738', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125906738.htm', title: 'LPR迎史上最大降息——你的房贷少还多少', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 10:31:46', summary: '4月，LPR迎来史上最大幅度的降息。', img: 'empty' },
              { news_id: 'qq_20201028A01PW100', news_url: 'https://new.qq.com/omn/20201028/20201028A01PW100.html', title: '华夏军工安全基金净值上涨1.02％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,华夏', pub_date: '2020-10-28 08:10:17', summary: '腾讯基金10月27日讯，华夏军工安全基金（代码002251）公布最新净值，数据显示，华夏军工安全净值上涨1.02%。本基金单位净值为1.384元，累计净值为1.384元。华夏军工安全基金近一周下跌4……', img: 'empty' },
              { news_id: 'qq_20201028A01PVP00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVP00.html', title: '快讯：蓝城物业刘新廷提名参选2020中国物业经理人100强', source: 'qq', category: 'house', media: '乐居财经', tags: '蓝城,物业公司,刘新廷,物业经理', pub_date: '2020-10-28 08:10:14', summary: '乐居财经讯由乐居财经主办，新浪财经、中国企业家、中房网、中物研协联合主办的“行稳致远——2020（第四届）中国物业经理人评选”网络报名正式启动。2020年10月28日，蓝城物业服务有限公司物业总……', img: 'empty' },
              { news_id: 'xinhua_1125905988', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905988.htm', title: '市场分化增速放缓 地价近十年来首降', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '受新冠肺炎疫情影响，土地市场在放缓的同时渐趋分化。', img: 'empty' },
              { news_id: 'qq_20201028A01PVR00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVR00.html', title: '扎区开展纪念中国人民志愿军抗美援朝出国作战70周年系列活动', source: 'qq', category: 'edu', media: '魅力满洲里', tags: '退役军人事务局,扎赉诺尔区,抗美援朝战争,中国人民志愿军', pub_date: '2020-10-28 08:08:49', summary: '铭记英雄伟绩，矢志强军兴军。10月26日，扎赉诺尔区退役军人事务局与区人民武装部联合组织开展了纪念中国人民志愿军抗美援朝出国作战70周年系列活动，传承革命精神。座谈中，扎赉诺尔区退役军人事务局负责人……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681290511/1000' },
              { news_id: 'xinhua_1125905994', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905994.htm', title: '公租房违规首次纳入银行征信系统', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '近日，广东省住房和城乡建设厅与人民银行广州分行签订了《合作备忘录》，首次将公租房违规信息纳入人民银行征信系统。', img: 'empty' },
              { news_id: 'qq_20201028A01PVT00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVT00.html', title: '保定检法联手 力促行政争议实质性化解', source: 'qq', category: 'politics', media: '河北检察', tags: '保定,保定市检察院,涿州市', pub_date: '2020-10-28 08:09:33', summary: '河北检察公众号ID：hbsjcy近日，保定市检察院、保定市中级法院与涿州市检察院、涿州市法院以及保定莲池区法院组成联合办案组，针对一起工商行政登记纠纷行政争议案件，在涿州市行政争议化解中心召开行政争……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681291106/1000' }
            ]
          }
        }
      })
    })
    wrapper.vm.selectclass(2)
    await flushPromises()
    wrapper.vm.quituser()
    expect(typeof wrapper.vm.$store.token).toBe('undefined')
    wrapper.vm.goto('www.baidu.com')
  })
  it('renders correctly with search button', async () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          data: {
            imgnews: [
              { news_id: 'xinhua_1125138244', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125138244.htm', title: '“景漂”青年：因瓷而来 为瓷添彩', source: 'xinhua', category: 'other', media: '新华网', tags: '景德镇,景漂,陶瓷,展览,协会,瓷博会', pub_date: '2019-10-23 09:39:28', summary: '在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。', img: 'empty', content: "['新华网南昌10月23日电（杨益民 王晓震）在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。18日，一年一度的景德镇瓷博会开幕。当日，景德镇景漂协会以“向上”为主题，打造了一场专题展览。展览呈现了景德镇景漂协会10位青年“景漂”设计师的陶瓷作品，探索景德镇陶瓷的“新玩法”。']" },
              { news_id: 'xinhua_1125137937', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125137937.htm', title: '因“瓷”结缘！“洋小伙”眼中的瓷博会', source: 'xinhua', category: 'other', media: '新华网', tags: '陶瓷,景德镇,爱好者,博览会', pub_date: '2019-10-23 11:19:01', summary: '来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。', img: 'empty', content: "['新华网南昌10月23日电（王晓震 杨益民）2019中国景德镇国际陶瓷博览会在千年瓷都景德镇举办，吸引了来自世界各地的陶瓷艺术爱好者前来参加。来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。']" },
              { news_id: 'qq_20201028A01PUD00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUD00.html', title: '华富物联基金净值上涨1.38％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,腾讯,沪深300指数,累计净值,净值增长率', pub_date: '2020-10-28 08:10:10', summary: '腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。华富物联基金近一周下跌1.74%，近……', img: 'empty', content: "['腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。', '华富物联基金近一周下跌1.74%，近一个月上涨5.22%，近一年上涨62.63%，基金成立以来累计上涨69.3%。', '华富物联基金成立于2016-01-21，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为陈奇。', '2020年半年报该基金实现收益473.06万元，报告期净值增长率为38.48%，报告期末基金份额总额为1005.73万份。']" },
              { news_id: 'xinhua_1125141813', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125141813.htm', title: '上车即入院！来看5G医联体急救转运车', source: 'xinhua', category: 'other', media: '新华网', tags: '附属医院,第一时间,南昌,设备,救护车,新一代,医联体,移动通信,物联网,大会', pub_date: '2019-10-23 16:22:31', summary: '在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', img: 'empty', content: "['新华网南昌10月23日电（王凯丰 王中庆）在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', '据介绍，车内通过5G、NB-IoT、eMTC等新一代宽带无线移动通信网技术，配备了物联网手环、高清影像设备、远程心电监护、医用AR眼镜等设备。只要患者上了救护车，医生就能第一时间开始治疗，实现“零时差”融合，做到了“上车即入院”。']" },
              { news_id: 'qq_20201028A01PUE00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUE00.html', title: '交银可转债C基金净值上涨1.58％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: 'c基金,可转债,基金,交银', pub_date: '2020-10-28 08:10:11', summary: '腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。交银可转债C基金近一周下……', img: 'empty', content: "['腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。', '交银可转债C基金近一周下跌0.28%，近一个月上涨3.68%，近一年上涨17.19%，基金成立以来累计上涨19.26%。', '交银可转债C基金成立于2019-07-11，业绩比较基准为10.0％×沪深300指数+20.0％×中债-综合指数-全价指数+70.0％×中证可转换债券指数。', '该基金基金经理为魏玉敏。', '2020年半年报该基金亏损3.3万元，报告期净值增长率为0.88%，报告期末基金份额总额为397.04万份。']" }],
            textnews: [
              { news_id: 'xinhua_1126347612', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347612.htm', title: '血压高，散步别太快', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '人们常说“饭后走一走，活到九十九”。', img: 'empty' },
              { news_id: 'qq_20201028A01PV400', news_url: 'https://new.qq.com/omn/20201028/20201028A01PV400.html', title: '城市服务：物管下一个风口？', source: 'qq', category: 'house', media: '乐居财经', tags: '物业公司,碧桂园服务,保利物业,万科物业,西塘镇,物业管理', pub_date: '2020-10-28 08:10:13', summary: '乐居财经 徐酒眠 发自上海物企业务边界进一步拓展，从社区住宅与商业转向城市公共服务。10月26日，新大正（002968）物业就此前变更募集资金用于收购事项，回复深交所关注函表示，随着物业……', img: 'empty' },
              { news_id: 'qq_20201028A01PXC00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PXC00.html', title: '钓了三十多年板鲫，至今发现，这三大调整特管用，秋钓不试就亏了', source: 'qq', category: 'life', media: '钓鱼人之行', tags: '秋钓,鲫鱼,野钓,饵料', pub_date: '2020-10-28 10:56:28', summary: '随着气温的不断下降，水温变的越来越低，此时要想在户外钓好鲫鱼和鲤鱼，就要根据鱼情和天气变化来调整作钓方法。虽然本人称不上是老钓手，但以三十多年的野钓经验，觉得天气越冷，大板鲫反而越好钓，只不过前提条……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000' },
              { news_id: 'xinhua_1126347577', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347577.htm', title: '运动让眼睛变明亮', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '生命在于运动，锻炼不仅健体，还能明目。', img: 'empty' },
              { news_id: 'qq_20201028A01PVG00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVG00.html', title: '泰信互联网基金净值上涨1.37％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,泰信,腾讯,沪深300指数,累计净值', pub_date: '2020-10-28 08:10:13', summary: '腾讯基金10月27日讯，泰信互联网基金（代码001978）公布最新净值，数据显示，泰信互联网净值上涨1.37%。本基金单位净值为1.623元，累计净值为1.623元。泰信互联网基金近一周下跌2.11……', img: 'empty' },
              { news_id: 'xinhua_1125921046', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921046.htm', title: '购房补贴全部发放 契税补贴暂不考虑', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '购房者期盼2016年施行的鼓励购房举措及时落地，抚州市临川区相关部门给说法。', img: 'empty' },
              { news_id: 'qq_20201028A01PVK00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVK00.html', title: '长盛创新基金净值上涨1.27％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,长盛', pub_date: '2020-10-28 08:10:14', summary: '腾讯基金10月27日讯，长盛创新基金（代码004745）公布最新净值，数据显示，长盛创新净值上涨1.27%。本基金单位净值为1.5107元，累计净值为1.5107元。长盛创新基金近一周下跌1.11%……', img: 'empty' },
              { news_id: 'xinhua_1125921005', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921005.htm', title: '给住宅楼加装电梯 这里的居民办成了', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '加装电梯，筹集资金也是关键的一步。', img: 'http://www.jx.xinhuanet.com/2020-04/29/1125921005_15881220717831n.jpg' },
              { news_id: 'qq_20201028A01PVM00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVM00.html', title: '弘阳服务：曾焕沙物业掘金14亿｜物业造富', source: 'qq', category: 'finance', media: '乐居财经', tags: '弘阳服务,曾焕沙,物业,弘阳地产,弘阳集团', pub_date: '2020-10-28 08:10:14', summary: '编者按：31家上市物企，超过7成发布了股权激励计划。不同企业的激励方案有何特色，成效如何？上市造就多少富豪？乐居财经“物业造富”系列，解码物企股权激励和造富生态。本期关注弘阳服务。乐居财经 ……', img: 'empty' },
              { news_id: 'xinhua_1125906738', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125906738.htm', title: 'LPR迎史上最大降息——你的房贷少还多少', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 10:31:46', summary: '4月，LPR迎来史上最大幅度的降息。', img: 'empty' },
              { news_id: 'qq_20201028A01PW100', news_url: 'https://new.qq.com/omn/20201028/20201028A01PW100.html', title: '华夏军工安全基金净值上涨1.02％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,华夏', pub_date: '2020-10-28 08:10:17', summary: '腾讯基金10月27日讯，华夏军工安全基金（代码002251）公布最新净值，数据显示，华夏军工安全净值上涨1.02%。本基金单位净值为1.384元，累计净值为1.384元。华夏军工安全基金近一周下跌4……', img: 'empty' },
              { news_id: 'qq_20201028A01PVP00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVP00.html', title: '快讯：蓝城物业刘新廷提名参选2020中国物业经理人100强', source: 'qq', category: 'house', media: '乐居财经', tags: '蓝城,物业公司,刘新廷,物业经理', pub_date: '2020-10-28 08:10:14', summary: '乐居财经讯由乐居财经主办，新浪财经、中国企业家、中房网、中物研协联合主办的“行稳致远——2020（第四届）中国物业经理人评选”网络报名正式启动。2020年10月28日，蓝城物业服务有限公司物业总……', img: 'empty' },
              { news_id: 'xinhua_1125905988', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905988.htm', title: '市场分化增速放缓 地价近十年来首降', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '受新冠肺炎疫情影响，土地市场在放缓的同时渐趋分化。', img: 'empty' },
              { news_id: 'qq_20201028A01PVR00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVR00.html', title: '扎区开展纪念中国人民志愿军抗美援朝出国作战70周年系列活动', source: 'qq', category: 'edu', media: '魅力满洲里', tags: '退役军人事务局,扎赉诺尔区,抗美援朝战争,中国人民志愿军', pub_date: '2020-10-28 08:08:49', summary: '铭记英雄伟绩，矢志强军兴军。10月26日，扎赉诺尔区退役军人事务局与区人民武装部联合组织开展了纪念中国人民志愿军抗美援朝出国作战70周年系列活动，传承革命精神。座谈中，扎赉诺尔区退役军人事务局负责人……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681290511/1000' },
              { news_id: 'xinhua_1125905994', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905994.htm', title: '公租房违规首次纳入银行征信系统', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '近日，广东省住房和城乡建设厅与人民银行广州分行签订了《合作备忘录》，首次将公租房违规信息纳入人民银行征信系统。', img: 'empty' },
              { news_id: 'qq_20201028A01PVT00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVT00.html', title: '保定检法联手 力促行政争议实质性化解', source: 'qq', category: 'politics', media: '河北检察', tags: '保定,保定市检察院,涿州市', pub_date: '2020-10-28 08:09:33', summary: '河北检察公众号ID：hbsjcy近日，保定市检察院、保定市中级法院与涿州市检察院、涿州市法院以及保定莲池区法院组成联合办案组，针对一起工商行政登记纠纷行政争议案件，在涿州市行政争议化解中心召开行政争……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681291106/1000' }
            ]
          }
        }
      })
    })
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const routes = [
      {
        path: '/',
        name: 'SearchResult'
      }
    ]
    const router = new VueRouter(routes)
    const wrapper = shallowMount(home, {
      router,
      localVue
    })
    await flushPromises()
    wrapper.vm.keyword = 'Iphone12'
    const button = wrapper.find('.btn_search')
    button.trigger('click')
    wrapper.vm.search()
  })
})
