import * as Mock from 'mockjs'

Mock.mock('/api/getnews/?type=0', 'get', (rqst) => {
  console.log(rqst)
  return { data: { imgnews: [{ news_id: 'xinhua_1125138244', news_url: 'https://imgm.gmw.cn/attachement/jpg/site215/20201117/3394590098221481407.jpg', title: '“景漂”青年：因瓷而来 为瓷添彩', source: 'xinhua', category: 'other', media: '新华网', tags: '景德镇,景漂,陶瓷,展览,协会,瓷博会', pub_date: '2019-10-23 09:39:28', summary: '在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000', content: "['新华网南昌10月23日电（杨益民 王晓震）在瓷都景德镇，有这么一群人，为了心中的陶瓷梦，从四面八方汇聚于此，被称为“景漂”。18日，一年一度的景德镇瓷博会开幕。当日，景德镇景漂协会以“向上”为主题，打造了一场专题展览。展览呈现了景德镇景漂协会10位青年“景漂”设计师的陶瓷作品，探索景德镇陶瓷的“新玩法”。']" }, { news_id: 'xinhua_1125137937', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125137937.htm', title: '因“瓷”结缘！“洋小伙”眼中的瓷博会', source: 'xinhua', category: 'other', media: '新华网', tags: '陶瓷,景德镇,爱好者,博览会', pub_date: '2019-10-23 11:19:01', summary: '来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000', content: "['新华网南昌10月23日电（王晓震 杨益民）2019中国景德镇国际陶瓷博览会在千年瓷都景德镇举办，吸引了来自世界各地的陶瓷艺术爱好者前来参加。来自美国的小明作为陶瓷爱好者，开始了他的第五次瓷博会之旅。']" }, { news_id: 'qq_20201028A01PUD00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUD00.html', title: '华富物联基金净值上涨1.38％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,腾讯,沪深300指数,累计净值,净值增长率', pub_date: '2020-10-28 08:10:10', summary: '腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。华富物联基金近一周下跌1.74%，近……', img: 'empty', content: "['腾讯基金10月27日讯，华富物联基金（代码001709）公布最新净值，数据显示，华富物联净值上涨1.38%。本基金单位净值为1.693元，累计净值为1.693元。', '华富物联基金近一周下跌1.74%，近一个月上涨5.22%，近一年上涨62.63%，基金成立以来累计上涨69.3%。', '华富物联基金成立于2016-01-21，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为陈奇。', '2020年半年报该基金实现收益473.06万元，报告期净值增长率为38.48%，报告期末基金份额总额为1005.73万份。']" }, { news_id: 'xinhua_1125141813', news_url: 'http://www.jx.xinhuanet.com/2019-10/23/c_1125141813.htm', title: '上车即入院！来看5G医联体急救转运车', source: 'xinhua', category: 'other', media: '新华网', tags: '附属医院,第一时间,南昌,设备,救护车,新一代,医联体,移动通信,物联网,大会', pub_date: '2019-10-23 16:22:31', summary: '在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', img: 'empty', content: "['新华网南昌10月23日电（王凯丰 王中庆）在2019世界VR产业大会上，由中国电信和南昌大学第一附属医院共同研发的5G医联体急救转运车成为关注的焦点。', '据介绍，车内通过5G、NB-IoT、eMTC等新一代宽带无线移动通信网技术，配备了物联网手环、高清影像设备、远程心电监护、医用AR眼镜等设备。只要患者上了救护车，医生就能第一时间开始治疗，实现“零时差”融合，做到了“上车即入院”。']" }, { news_id: 'qq_20201028A01PUE00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PUE00.html', title: '交银可转债C基金净值上涨1.58％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: 'c基金,可转债,基金,交银', pub_date: '2020-10-28 08:10:11', summary: '腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。交银可转债C基金近一周下……', img: 'empty', content: "['腾讯基金10月27日讯，交银可转债C基金（代码007317）公布最新净值，数据显示，交银可转债C净值上涨1.58%。本基金单位净值为1.1926元，累计净值为1.1926元。', '交银可转债C基金近一周下跌0.28%，近一个月上涨3.68%，近一年上涨17.19%，基金成立以来累计上涨19.26%。', '交银可转债C基金成立于2019-07-11，业绩比较基准为10.0％×沪深300指数+20.0％×中债-综合指数-全价指数+70.0％×中证可转换债券指数。', '该基金基金经理为魏玉敏。', '2020年半年报该基金亏损3.3万元，报告期净值增长率为0.88%，报告期末基金份额总额为397.04万份。']" }], textnews: [{ news_id: 'xinhua_1126347612', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347612.htm', title: '血压高，散步别太快', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '人们常说“饭后走一走，活到九十九”。', img: 'empty', content: "['身体好,每分钟100~120步；若体质差、年龄大，每分钟70~100步', '东南大学附属中大医院内分泌科运动治疗师 韩 青', '人们常说“饭后走一走，活到九十九”。确实，饭后走一走，有利于加快肠道蠕动，帮助消化吸收。但对血压较高的老人来说，散步注意一些要点，才能健康又安全。', '时间：最好不选早晨。高血压老人最好不要选择早上散步，因为清晨气温偏低，人体血管收缩明显，血压容易升高。一天中，晚血压相对稳定，可在晚饭0.5~1小时后进行适度散步，活动时间控制在20~30分钟。', '姿势：不要背手、驮背。心血管不好或患高血压的老人散步时，最好挺胸抬头，微微收腹，自然摆臂，走路时尽量前脚掌先着地。这样可以防止引起头晕等不适症状。', '3.运动强度：以微微出汗、全身发热为宜。身体状况较好的老人可进行中速走，控制在每分钟100~120步；体质较差、年龄较大的老人最好慢速走，每分钟70~100步是合适速度。', '天气热时，运动要适当补充水分。散步时，老人可与同伴进行一些交流，但尽量不要唱歌，以免影响呼吸；应选择舒适的运动鞋，保护脚踝关节免受伤害；选择平坦整洁的道路，塑胶跑道为佳。', '值得提醒的是，伴有心梗等严重心脏病的高血压老人，外出锻炼需随身携带急救药；伴有糖尿病的高血压老人，建议带点干粮，防止低血糖发生。如果是血压达到180/110毫米汞柱，血糖高于16.7毫摩尔/升，或近期有新发脑梗或脑出血的老人，不建议散步。']" }, { news_id: 'qq_20201028A01PV400', news_url: 'https://new.qq.com/omn/20201028/20201028A01PV400.html', title: '城市服务：物管下一个风口？', source: 'qq', category: 'house', media: '乐居财经', tags: '物业公司,碧桂园服务,保利物业,万科物业,西塘镇,物业管理', pub_date: '2020-10-28 08:10:13', summary: '乐居财经 徐酒眠 发自上海物企业务边界进一步拓展，从社区住宅与商业转向城市公共服务。10月26日，新大正（002968）物业就此前变更募集资金用于收购事项，回复深交所关注函表示，随着物业……', img: 'empty', content: "['  物企业务边界进一步拓展，从社区住宅与商业转向城市公共服务。', '  10月26日，新大正（002968）物业就此前变更募集资金用于收购事项，回复深交所关注函表示，随着物业管理范围延伸至城市服务的各个方面，新大正物业不仅为城市各类建筑提供基础物业服务，也要覆盖到整个城市公共空间。', '  10月24日，万科集团举办中西区域媒体交流会，推出国内第一个以城市服务为定位的全新品牌——万物云城。', '  此前十天，10月14日晚间，碧桂园服务（06098.HK）公告称，拟以不超24.5亿元收购环境卫生运营服务商满国康洁70%股权。此举亦旨在加码其城市服务产业链布局。', '  紧跟国家城镇化进程，探索城市服务蓝海，万亿市场空间待挖掘。先头部队已展开对新市场探索，动辄百万平的项目规模扩张的诱惑之下，后遣之军势必也会加速入场。', '  龙头物企圈地城市服务', '  上半年，物企抢滩城市服务就有过一轮热潮。', '  仅在5月份，万科物业进驻鼓浪屿、龙湖智慧服务签约岳阳城陵矶新港区、保利物业再次中标嘉善项目、佳兆业美好与河北邯郸市峰峰矿区共同成立城市综合服务平台……', '  自2018年9月横琴起步，万科物业已然成为城市服务的领衔者。', '  公开信息显示，两年中，万科物业城市服务业务布局已完成10个城市、12个项目。截至2020年9月，万科物业签下了珠海横琴、雄安新区、广州白云区、成都高新区、青岛动车小镇、厦门鼓浪屿、武汉江汉区、江门人才岛、郑州二七区、成都TOD、深圳河治理及管养、坪山河的治理及管养等城市空间项目。', '  万物云城已有“百城计划”：在京津冀、长三角、大湾区三个核心城市群，以及成都、重庆、武汉、青岛、郑州、西安、济南7个重点城市，计划三年内落地100个城市服务项目。', '  碧桂园服务在城市服务的探索比万科物业还要早一些。', '  2015年，碧桂园服务与陕西省韩城市市政府达成战略合作关系，共同出资成立韩城碧桂园城市服务有限公司，启动城市服务新模式。2018年12月，碧桂园服务发布了城市服务的2.0升级产品——城市共生计划，聚焦市政运营一体化、城市空间运营、生态托管服务三大领域。', '  截止目前，碧桂园服务已与遵义、衡水、开原、西昌等十余个城市达成战略合作。今年，除了5月中标山西省寿阳县环卫项目，以及前面提及的收购满国康洁，先后还与陆良滇中健康城、天津军粮城、大连金普新区、衢州交投集团等9个合作方达成战略协议。', '  头部物企率先入局的还有保利物业。2020年以来，尤其向城镇景区、高校教研及轨道交通物业三大核心业态聚焦。', '  2016年，保利物业进驻嘉善县西塘古镇，开启城市物业进驻公共服务领域实践，并以西塘古镇景区为基点，向周边进行辐射，近年来陆续承接了西塘镇政府、西塘保税区、纽扣中心、西塘镇、天凝镇、陶庄镇、姚庄镇、大云镇、罗星街道等街镇的公共服务管理项目。2018年，保利物业推出“镇兴中国”物业品牌。', '  在“大物业”的战略之下，保利物业坚定不移地发展公共服务。纵观其大物业版图，东南在管浙江西塘古镇、华南在管金町湾景区、中部在管河南阿斗寨景区。上月底，成功入驻兰州新地标建筑黄河楼。', '  刚在10月26日通过上市聆讯的融创服务，也在加紧布局城市服务业务。', '  9月份，融创物业先与南昌市政公用资产管理有限公司签署战略合作协议，双方将合资组建江西融政物业服务有限公司，在城市服务整合管理领域展开深度合作；后又与天津市南开区政府签订战略合作，在公共服务多领域进行合作。', '  此外，招商积余双品牌均在城市新区落子，借助母公司资源，去年9月，招商物业在海南三亚崖州湾科技城试点首个城市服务项目；今年5月，中航物业通过市场化招投标，获取青岛市即墨经济开发区城市空间物业综合服务项目。', '  去年2月，时代邻里以4536万元收购广州东康物业服务有限公司100%股份，切入市政环卫服务领域。截至 2019 年末，公司在管6个市政环卫项目，全部位于粤港澳大湾区，建筑面积810万平，主要为公共道路、垃圾站及公园等提供道路清 洁、垃圾回收及垃圾运输服务。', '  去年8月，深业物业集团“物管城市”项目在福田区华富街道也率先试点。', '  据新大正招股书，拟投资1.24 亿元用于市政环卫业务拓展，计划2020年拓展进入小型市政环卫项目1个。', '  今年6月，雅生活服务与环卫上市公司玉禾田签署了《环卫一体化项目战略合作协议》，双方将在全国范围内共同合作开发环卫一体化项目。', '  短期盈利弱，但收入规模可观', '  城市服务涉及到各项市政服务和盘活社会资源等领域，政府在选择物企的时候，对其体量和专业化水平要求严、标准高。业内人士分析，现阶段城市服务是高门槛、高投资和低产出的特点，不适合绝大部分物企去试水，贸然去进军物业城市，只会先将自己耗死。', '  以保利物业物业2019年财报数据为例，其2019年公共服务领域在管面积约1.4亿平方米，占总在管面积48.9%；但公共及其他物业的营收约4.18亿元，约占物业管理服务总收入12.5%。', '  与之相比，在管面积占比不到2.7%的商业及写字楼的物管收入却约达4.99亿元，约占物业管理服务总收入13%。', '  但长期来看，城市服务的增长空间很大。华泰证券研报称，仅市政环卫就能够为物业管理行业带来16%的营收增量。2019年中国市政环卫市场规模为3171亿元，预计2020-2024的符合年增长率为7%，2020年市场规模有望达到4352亿元。', '  城市服务对物业公司资源统筹和服务能力要求较高，头部公司凭借资源优势和高水平服务参与优势更加明显。', '  更重要的一点是，城市服务业务营收非常可观。', '  万科物业CEO朱保全曾公开透露，2019年横琴“物业城市”带来的收入大约有5亿元。若未来三年成功落地100个项目，城市服务为万科带来的收入或至少达到500亿元，将大概率超过万科住宅物业。', '  2020物业管理行业发展指数报告发布会上，碧桂园服务执行董事兼总裁李长江曾言，“碧桂园服务上半年的合约收入接近30个亿，而城市服务的合约收入超过了15个亿，这是从来没有过的。”', '  今年以来，多地修订物管条例，完善、规范物管制度。相关政策出台有利于规范行业，让物业公司更好的参与到城市服务治理中。', '  城市服务领域或将成为物企新的角逐场。', '文章来源:物业K线']" }, { news_id: 'qq_20201028A01PXC00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PXC00.html', title: '钓了三十多年板鲫，至今发现，这三大调整特管用，秋钓不试就亏了', source: 'qq', category: 'life', media: '钓鱼人之行', tags: '秋钓,鲫鱼,野钓,饵料', pub_date: '2020-10-28 10:56:28', summary: '随着气温的不断下降，水温变的越来越低，此时要想在户外钓好鲫鱼和鲤鱼，就要根据鱼情和天气变化来调整作钓方法。虽然本人称不上是老钓手，但以三十多年的野钓经验，觉得天气越冷，大板鲫反而越好钓，只不过前提条……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681288442/1000', content: "['随着气温的不断下降，水温变的越来越低，此时要想在户外钓好鲫鱼和鲤鱼，就要根据鱼情和天气变化来调整作钓方法。虽然本人称不上是老钓手，但以三十多年的野钓经验，觉得天气越冷，大板鲫反而越好钓，只不过前提条件必须是，灵活使用以下这三大调整策略，否则秋钓也就只能封竿了。', '1、随时调整饵料', '凡是钓鱼人都知道，一款好的饵料不仅味型要对路，连它入水之后的状态也不能被忽视。虽然钓谚中有提到，“春腥、夏淡、秋香、冬浓”。可也不是说，秋天也就只能用香，单纯的用香饵或者腥饵都是不正确的，只有香饵为主，腥味为辅才是最正确的搭配思路。', '至于钓饵入水后的状态，完全要根据鱼情的变化而变化，气温低时，可以加入轻质状态粉来降低它的比重，提高适口性。可若是该水域中杂鱼多，也可选择加酒米增加它的比重，从而快速到底，避开杂鱼层。', '2、调整线组大小', '另外秋钓鲫鱼，还需要随时调整线组大小，当然在此之前，要了解这个季节鱼的活动规律，秋季鱼儿都比较好动，出来觅食比较频繁异常活跃。所以垂钓半斤左右的板鲫时，需要用1.0或1.5的主线，随后再搭配0.6或1.0号的子线就可以。只不过初秋到深秋，气温是由高到低的转变过程，所以线组也要从大用到小。', '3、浮漂调整灵钝', '尽管以前一直跟钓友们强调，不管野钓鲫鱼还是鲤鱼，浮漂宁可调钓的钝一些，也绝不能钓的过于灵活。毕竟野钓不像黑坑老滑鱼多，我们可以调高目钓高目，调6到8目钓4到6目都可以。但浮漂调钓不仅要看作钓环境，还需要综合天气气温等因素，比如在鱼口比较轻的情况下，调高目浮漂的信号难以体现，动作非常的轻微，为了使浮漂更加的灵敏，应该将调目降低，使用的调五钓二的钓法就较为合适。']" }, { news_id: 'xinhua_1126347577', news_url: 'http://www.jx.xinhuanet.com/2020-08/11/c_1126347577.htm', title: '运动让眼睛变明亮', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-08-11 09:06:59', summary: '生命在于运动，锻炼不仅健体，还能明目。', img: 'empty', content: "['生命在于运动，锻炼不仅健体，还能明目。近日，一项新研究发现，运动可以延缓黄斑变性的发生、进展，并可能预防青光眼和糖尿病视网膜病变等一些常见致盲眼病。', '血管过度生长并相互纠缠是导致黄斑变性和其他几种眼病的关键因素，美国弗吉尼亚大学医学院团队就此开展了两次小鼠实验。初步对比活跃好动和安静不动的小鼠发现，运动可以使小鼠眼部有害血管的过度生长减少45%。之后，研究人员对第一次实验结果做了进一步验证，最终证实运动减少了32%的眼部血管问题。', '弗吉尼亚大学高级视觉科学中心研究员布拉德利·盖尔芬德博士指出，运动明目可能是身体活动促进了眼部血液流量增加等多种因素作用的结果。事实上，运动不仅有益延缓中老年人因年龄增长所致的视力衰退，户外活动还有助预防青少年近视。早前的一项研究显示，儿童只需多出门跑跑跳跳，每周在自然光线下玩耍14小时，就能降低近视风险。（楼林娜）']" }, { news_id: 'qq_20201028A01PVG00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVG00.html', title: '泰信互联网基金净值上涨1.37％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,泰信,腾讯,沪深300指数,累计净值', pub_date: '2020-10-28 08:10:13', summary: '腾讯基金10月27日讯，泰信互联网基金（代码001978）公布最新净值，数据显示，泰信互联网净值上涨1.37%。本基金单位净值为1.623元，累计净值为1.623元。泰信互联网基金近一周下跌2.11……', img: 'empty', content: "['腾讯基金10月27日讯，泰信互联网基金（代码001978）公布最新净值，数据显示，泰信互联网净值上涨1.37%。本基金单位净值为1.623元，累计净值为1.623元。', '泰信互联网基金近一周下跌2.11%，近一个月上涨6.85%，近一年上涨48.9%，基金成立以来累计上涨62.3%。', '泰信互联网基金成立于2016-06-08，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×沪深300指数。', '该基金基金经理为钱鑫。', '2020年三季报该基金实现收益497.22万元，报告期净值增长率为9.54%，报告期末基金份额总额为3596.58万份。']" }, { news_id: 'xinhua_1125921046', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921046.htm', title: '购房补贴全部发放 契税补贴暂不考虑', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '购房者期盼2016年施行的鼓励购房举措及时落地，抚州市临川区相关部门给说法。', img: 'empty', content: "['原标题：购房者期盼2016年施行的鼓励购房举措及时落地，抚州市临川区相关部门给说法——', '购房补贴全部发放 契税补贴暂不考虑', '2016年4月11日，抚州市临川区人民政府办公室下发通知，对在上顿渡城区购房的居民给予购房补贴和契税补贴，吸引了众多居民购房。然而，直至去年5月20日，临川区才陆续发放购房补贴。4月27日，记者了解到，时隔快一年，申领到购房补贴的购房者，约为符合条件人数的三分之一，而契税补贴何时能够申请，仍是未知数。', '在曹阳(化名)购房摇摆不定的时候，临川区一条鼓励城乡居民购房的通知，让他坚定了买房的决心。这条通知就是临川区政府办《关于印发上顿渡城区化解房地产库存工作措施的通知》(以下简称《通知》)，该《通知》要求，对城乡居民购买首套普通商品住房的，按照购房建筑面积给予每平方米240元的购房补贴，购买二套以上普通商品住房的，给予每平方米120元的购房补贴，执行时间为2016年4月11日至2017年4月10日。', '于是，曹阳向亲朋好友借钱，2016年7月付了首付，在才都国际小区购买了自己的首套住房。“购房补贴大概有3万元，当时想一年左右可以申请到购房补贴，把欠朋友的债先还了。结果等了3年多，才申请到购房补贴。”曹阳告诉记者，但契税补贴一直没有着落。而与他同时购房的同学，在抚州市中心城区的购房补贴和契税补贴早已到账。记者了解到，曹阳申请的住房补贴和契税补贴由临川区负责，其同学的则由抚州市负责，因此存在差异。', '不过，曹阳能申领到购房补贴还算是比较幸运的。记者调查了解到，临川区有部分购房者虽然符合申请购房补贴和契税补贴条件，但至今两项补贴都没有申领到。刘君(化名)告诉记者，他去年10月份提交了完整的材料，但到现在补贴还没有到账。“当时看到相关政策后才决定去买房的，认为补贴会及时兑现。”刘君说，“没想到，房子装修入住了，购房补贴和契税补贴还没影。”', '临川区房管局局长杨光辉坦承，临川区政府办印发的《通知》，对购房者进行两项补贴，确实对当时房地产去库存起到了积极作用。', '“当时每平方米均价5000元。”临川区某楼盘开发商称，“政策出台后，受益于两项补贴，原本冷清的售楼部甚至出现了排队签合同的现象，去了库存，解决了我们资金链的难题。”', '据介绍，由于补贴力度大，《通知》的下发大大刺激了上顿渡城区的房产交易市场。经初步统计，这期间房产交易预计超过5000套，初步核算需要补贴购房者1.7亿元。', '临川区执行的购房补贴、契税补贴政策，是参照抚州市文件执行的。不过，购房补贴比抚州市中心城区要高，其中首套房每平方米高出40元，二套以上每平方米高出20元。记者调查了解到，在抚州市中心城区购房的，只要提出申请且通过核查的购房者，购房补贴和契税补贴已全部发放到位。', '“临川区购房补贴是从去年5月20日开始发放。因为人比较多，我们专门设立了补贴窗口。”杨光辉表示，目前申报的有4900多户符合条件，已经补贴了1800多户，因为申报材料需要核查，不能出错，进度比较慢。杨光辉补充道：“目前我们加班加点核查，6月底购房补贴可全部发放到位。”', '购房补贴有了着落，那契税补贴该如何操办呢?临川房管局相关负责人周福林表示，契税补贴申请应该由临川区税务局负责。', '“这是地方政府出台的文件，国家税务部门并没有出台这样的政策。”临川区税务局相关负责人表示，契税缴纳进入国库之后，会100%返到地方财政。他认为，临川区采取契税补贴的政策，刺激了地方经济发展，但是没有具体的实施方案，导致很多人从字面上理解为“契税减半”，政策应该由税务部门来落实，这是错误的。', '“缴纳契税，国家有统一标准，缴纳多少有专门软件计算，不存在契税减半这一说法。”临川区税务局相关负责人指着《通知》说，“何况《通知》明确了‘个人购买新建普通商品住房的，给予实缴契税50%的财政补贴’，并不是大家所说的契税减半，而是给予契税财政补贴。因为契税补贴没有具体实施方案，就不应该由税务部门来负责。如果有实施方案提到了由税务部门来配合，我们会极力配合。”', '而临川区明确了符合申领购房补贴条件的购房者，必须有契税凭证，这意味着可以申领购房补贴的个人均缴纳了契税。据了解，抚州市中心城区契税补贴，由抚州市房管部门与购房补贴一并办理。至于临川区什么时候落实好契税补贴，杨光辉称：“契税是先征收后补贴，目前财力有限，暂不考虑。”', '江西财经大学法学教授王柱国表示，从临川区房产交易数据来看，采取购房补贴、契税补贴的方式来刺激房产交易，去了库存，其出发点是好的，但出台政策时必须要匹配当地的财政支付能力。临川区在出台购房补贴政策之前，应该明确补贴兑现的时间，并对实施的条件、可能带来的后果等进行科学论证，提高可行性，让惠民的好政策及时落地。（记者 余红举）']" }, { news_id: 'qq_20201028A01PVK00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVK00.html', title: '长盛创新基金净值上涨1.27％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,长盛', pub_date: '2020-10-28 08:10:14', summary: '腾讯基金10月27日讯，长盛创新基金（代码004745）公布最新净值，数据显示，长盛创新净值上涨1.27%。本基金单位净值为1.5107元，累计净值为1.5107元。长盛创新基金近一周下跌1.11%……', img: 'empty', content: "['腾讯基金10月27日讯，长盛创新基金（代码004745）公布最新净值，数据显示，长盛创新净值上涨1.27%。本基金单位净值为1.5107元，累计净值为1.5107元。', '长盛创新基金近一周下跌1.11%，近一个月上涨10.77%，近一年上涨67.3%，基金成立以来累计上涨51.07%。', '长盛创新基金成立于2017-08-16，业绩比较基准为50.0％×沪深300指数+50.0％×中证综合债券指数。', '该基金基金经理为孟棋。', '2020年半年报该基金实现收益1041.25万元，报告期净值增长率为27.61%，报告期末基金份额总额为2527.58万份。']" }, { news_id: 'xinhua_1125921005', news_url: 'http://www.jx.xinhuanet.com/2020-04/29/c_1125921005.htm', title: '给住宅楼加装电梯 这里的居民办成了', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-29 09:29:28', summary: '加装电梯，筹集资金也是关键的一步。', img: 'http://www.jx.xinhuanet.com/2020-04/29/1125921005_15881220717831n.jpg', content: "['给既有住宅加装电梯，是很多老旧小区居民的期盼，政府部门也出台了相关扶持和鼓励政策。不过，加装成功的案例，目前还寥寥无几。在南昌市西湖区二七南路金茂大厦商住楼，出现了令人欣喜的一例。4月26日，记者对此进行了采访，希望剖析其中的经验，给其他老旧小区居民提供借鉴。', '“电梯能安装成功，首先要归功于我们社区的陈铁铮、余建业两位老人，他们可以说是跑细了腿，操碎了心!”记者采访中得知，在两位老人的共同努力下，事情一步一步往前推进，终于办成了。', '走进金茂大厦商住楼，记者看到，楼下三层为商铺，层高比一般的居民楼要高不少，居民都是住在3楼以上，而这3层的高度相当于普通居民楼的4层。居民先要爬到4楼的大平台，再通过各单元楼梯回家。', '陈铁铮告诉记者，小区2001年投入使用，“当时我们40多岁，还能爬得动，现在60多岁了，爬楼梯实在费劲。”', '从2018年下半年开始，陈铁铮与余建业商量着要在小区内加建电梯，从1楼直达4楼的大平台。', '在取得几名业委会成员的支持后，他们开始在小区内贴公告，并对小区内110户业主上门发征集意见表。经过业委会成员上门沟通做工作，很快就获得了三分之二以上居民支持。', '“小区内业主基本上认为安装电梯是好事，但也出现了反复情况，有4楼的业主觉得电梯井影响采光，又不同意了。这时候就需要群策群力，不断沟通，并提出补偿方案，直到取得同意为止。”', '事实上，有不少老旧小区居民楼加装电梯的想法在取得大多数居民支持这一步上就停了下来，这时候如果没有人领头坚持做工作，居民意见很难统一，加装电梯也就遥遥无期。', '“一开始我们想得太简单了，觉得在自己小区内加装电梯，居民也同意，就直接找到电梯公司谈好价格开工了。”余建业说，没想到刚挖地基，就被城管执法人员叫停，要求他们办理行政许可证明。', '“要怎么获得行政许可?我们根本摸不到头脑，好在社区和街道干部给予支持，指点我们该如何办证。”陈铁铮说，2018年年底，施工被叫停后，他和余建业两人就到西湖区规划部门去申请办理行政许可。', '“因为缺乏经验，我们跑了很多次。”余建业介绍，办理行政许可要找出楼房以前的设计图纸、要出楼房加装电梯的设计图纸等等，都是非常繁琐的事情。“光找以前的设计图纸就找了很久，毕竟居民楼建成都快20年了，最后是在设计院的一个小仓库内把图纸翻出来的。”', '“除了规划，还有消防、环保等部门的检查许可，好在现在办事效率都很高，也都支持老旧小区改造，经过几个月的办理，我们终于拿到了加装电梯的行政许可。”余建业说。', '加装电梯，筹集资金也是关键的一步。低层住户与高层住户往往因认缴额度引发争议。虽然金茂大厦商住楼不存在这一问题，但过程一样曲折。', '“开始大家都同意加装电梯，但到认缴资金的时候，许多人说等安装好再交钱。”陈铁铮说，大多数人一开始不相信这事能办成。“前期只有我们业委会成员与几名老党员交了钱，但随着电梯建设一步步推进，交钱的越来越多，到现在电梯开通几个月了，还有交钱办卡乘坐电梯的。”', '经过大家的努力推进，2019年12月5日，电梯正式投入使用。', '现在提起电梯，居民们都一脸笑容。居民苏大爷说：“我们老两口都80多岁了，以前没电梯时不太敢下楼，现在没事就下去逛逛，比闷在家里舒服多了。”', '二七南路北社区相关负责人表示：“安装电梯不仅提高了大家的幸福指数，在经办过程中，也大大增强了居民们的凝聚力。”（记者 蔡颖辉文/图）']" }, { news_id: 'qq_20201028A01PVM00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVM00.html', title: '弘阳服务：曾焕沙物业掘金14亿｜物业造富', source: 'qq', category: 'finance', media: '乐居财经', tags: '弘阳服务,曾焕沙,物业,弘阳地产,弘阳集团', pub_date: '2020-10-28 08:10:14', summary: '编者按：31家上市物企，超过7成发布了股权激励计划。不同企业的激励方案有何特色，成效如何？上市造就多少富豪？乐居财经“物业造富”系列，解码物企股权激励和造富生态。本期关注弘阳服务。乐居财经 ……', img: 'empty', content: "['31家上市物企，超过7成发布了股权激励计划。不同企业的激励方案有何特色，成效如何？上市造就多少富豪？乐居财经“物业造富”系列，解码物企股权激励和造富生态。本期关注弘阳服务。', '  “努力到无能为力，拼搏到感动自己。”历经逾30年商海沉浮，曾焕沙始终保持着对生活和工作热切的渴望。', '  53岁的曾焕沙是弘阳集团董事长，在弘阳集团官网董事长致辞一列，他曾说道：“自古以来，做人难，做好人更难。我还是愿意走很难的路：宁愿别人负我，我不负他人。”', '  与杀伐决断的商人相比，曾焕沙多了一份感性。“在商言商”是商场之道，曾焕沙却不以为然，他更奉行“在商言人”，以人为本是他管理公司的准则。', '  无论是中秋佳节还是新年，他都会写上一封致辞信，和公司伙伴说一说心里话，以他的亲身经历，鼓舞很多处于迷茫中的年轻人。', '  这个16岁便离家从军的曾焕沙，5年的海军航空兵经历，铸就了其坚毅的性格，也为其创业之路埋下了拼搏的种子。', '  上世纪80年代，退伍后的曾焕沙选择留在海南经商，1988年，他从事瓷砖建材批发生意，并先后创办了海口龙华商行、海口沙龙实业有限公司。', '  尽管在创业的当口，曾焕沙仍然没有停止求学的脚步，1990年5月至1994年6月他在海南大学学习。', '  创业之路并非坦途，受当时海南楼市泡沫的影响，曾焕沙的瓷砖建材生意受到了冲击。1995年他果断转战南京，谋出路。', '  1996年5月28日，曾焕沙的创业之路迎来曙光，这一天，他投入全部身家、几经周折在南京创办的红太阳商业大世界终于开业了。', '  3年后的1999年，南京红太阳注册成立，首个住宅项目旭日华庭开工，并于2003年开始销售，这就是弘阳地产（HK:01996）的前身。', '  同年，为承接地产物业管理业务，弘阳服务(HK:01971)在南京诞生，彼时和发展如火如荼的地产板块业务相比，物业服务领域却少有人问津，盈利能力不被看好。', '  对于物业板块，曾焕沙没有急于求成，他选择韬光养晦，潜心打磨服务质量。', '  随着地产业务的拓展，为物业备足粮草的曾焕沙，继2018年7月12日，将弘阳地产推向港交所后，开始寻求弘阳服务在资本市场上新的尝试。', '  2020年7月7日，潜行17年之久的弘阳服务，终于在资本市场浮出水面。', '  据披露，2020年上半年，弘阳服务在管面积稳步扩大，同比增长46.5%至1872万平方米，在管项目112个，合同建筑面积达到3101万平方米。', '  截至6月30日末，弘阳服务实现总收入3.23亿元，同比增长60.4%；净利润3739万元，同比增长64.6%；毛利润8495万元，同比增长67.6%。', '  弘阳服务上市后，受到了资本的追捧。截至10月26日收盘，股价已从上市发行价4.15港元/股，涨至5.26港元/股，涨幅为26.75%，市盈率是母公司弘阳地产的5.3倍。', '  曾焕沙作为弘阳服务的实际控制人，持有3亿股，占已发行股份的72.29%，持股市值约14亿元人民币。虽然不敌其在弘阳地产的持股市值，但是，作为高估值的物业行业，以及随着存量房时代的到来，未来还有很大的发展潜力。', '  对于曾焕沙而言，弘阳服务不仅是作为地产业务补充的存在，它还被赋予了新的寄托和可能。上市之前他将27岁的女儿曾子熙推向弘阳服务执行董事的位子，是最好的证明。', '文章来源:物业K线']" }, { news_id: 'xinhua_1125906738', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125906738.htm', title: 'LPR迎史上最大降息——你的房贷少还多少', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 10:31:46', summary: '4月，LPR迎来史上最大幅度的降息。', img: 'empty', content: "['4月，LPR迎来史上最大幅度的降息。', 'LPR是央行公布的贷款市场报价利率。最新一期报价显示，5年期以上LPR，也就是与房贷相关的利率为4.65%，比之前降了10个基点。这是去年8月LPR改革以来降息幅度最大的一次。', 'LPR降息幅度这么大，房贷能少还点吗?这得看你的房贷是否换成了按照LPR利率来计算的浮动利率。一般来说，如果是去年10月以后办的房贷，已经直接与LPR挂钩，执行浮动利率;如果是去年10月之前办的房贷，需要自己决定房贷是执行LPR浮动利率还是转换为固定利率——二选一，且只能选一次。', '如果你选择转换为浮动利率，那么，这次LPR降息将体现在你2021年的房贷上——为何不是现在?因为就算选择了与LPR挂钩的浮动利率，银行也是一年为你调整一次房贷利率，一般为每年1月1日，即2021年你的房贷利率会根据2020年底的LPR水平调整。', '好消息是，这一水平大概率是继续下降的。从2019年8月以来，LPR利率一直往下走。特别是关系到房贷的5年期以上LPR，已经3次下调，从4.85%降至4.65%。因此，去年10月之前办的房贷，现在选择转换为挂钩LPR的浮动利率还不晚。明年开始，你的房贷利率水平大概率会下降。', '那么，每个月到底能少还多少钱呢?我们分两种情况来看：', '第一种：如果你买房时，房贷利率上浮10%，房贷基准利率为4.9%。那么，原来你的房贷利率为4.9%×(1+10%)=5.39%。以2019年12月的5年期以上LPR利率4.80%作为基准，5.39%-4.8%=0.59%。那么你的房贷利率公式就是LPR+59个基点，以目前的5年期4.65%计算，降息后你的房贷利率是4.65%+0.59%=5.24%。以100万元房贷贷20年为例，每个月可少还84元。', '第二种：如果买房时，房贷利率是打折的。那么，以房贷利率打85折为例，此前房贷基准利率为4.9%。以前，你的房贷利率是4.9%×0.85=4.165%;以2019年12月的5年期以上LPR利率4.80%作为基准。4.165%-4.8%=-0.635%。那么，你的房贷利率公式就是LPR-63.5个基点，以目前的5年期4.65%计算，你的房贷利率是4.65%-0.635%=4.015%。以100万元房贷贷20年为例，每月可少还80元。', '总体来看，只要选择了浮动利率，那么在当前LPR利率接连下降的背景下，明年你的房贷都能少还一点儿。', '业内专家预计，在坚持“房住不炒”的背景下，为降低实体经济融资成本，LPR利率接下来仍有下行空间。(记者 陈果静)']" }, { news_id: 'qq_20201028A01PW100', news_url: 'https://new.qq.com/omn/20201028/20201028A01PW100.html', title: '华夏军工安全基金净值上涨1.02％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '基金,华夏', pub_date: '2020-10-28 08:10:17', summary: '腾讯基金10月27日讯，华夏军工安全基金（代码002251）公布最新净值，数据显示，华夏军工安全净值上涨1.02%。本基金单位净值为1.384元，累计净值为1.384元。华夏军工安全基金近一周下跌4……', img: 'empty', content: "['腾讯基金10月27日讯，华夏军工安全基金（代码002251）公布最新净值，数据显示，华夏军工安全净值上涨1.02%。本基金单位净值为1.384元，累计净值为1.384元。', '华夏军工安全基金近一周下跌4.55%，近一个月上涨1.69%，近一年上涨54.29%，基金成立以来累计上涨38.4%。', '华夏军工安全基金成立于2016-03-22，业绩比较基准为50.0％×上海证券交易所国债指数+50.0％×中证国防指数。', '该基金基金经理为万方方 王晓李。', '2020年三季报该基金实现收益11904.11万元，报告期净值增长率为36.83%，报告期末基金份额总额为144432.22万份。']" }, { news_id: 'qq_20201028A01PVP00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVP00.html', title: '快讯：蓝城物业刘新廷提名参选2020中国物业经理人100强', source: 'qq', category: 'house', media: '乐居财经', tags: '蓝城,物业公司,刘新廷,物业经理', pub_date: '2020-10-28 08:10:14', summary: '乐居财经讯由乐居财经主办，新浪财经、中国企业家、中房网、中物研协联合主办的“行稳致远——2020（第四届）中国物业经理人评选”网络报名正式启动。2020年10月28日，蓝城物业服务有限公司物业总……', img: 'empty', content: "['由乐居财经主办，新浪财经、中国企业家、中房网、中物研协联合主办的“行稳致远——2020（第四届）中国物业经理人评选”网络报名正式启动。2020年10月28日，蓝城物业服务有限公司物业总经理刘新廷获提名，成为“2020中国物业经理人100强”候选人。', '  自2017年首届中国地产经理人评选启动以来，受到了行业内外的广泛关注，已成为国内最具影响力和公信力的房地产行业评选活动。据了解，2019年，在房产领域，地产经理人评选不仅覆盖一二三线约60城市，还有近100个四五线城市，近300家中国主流房地产企业参与评选。在家居领域，近50城市超500名候选人参与，覆盖200家主流家居企业，包括国内知名装饰公司、家居建材、智能家居、家用电器等一流品牌企业。在物业领域，覆盖范围更广，中国物业经理人评选的候选人来自头部的500多家物业公司，总计70403个物业社区。', '  整个评选流程坚守公平、公正和公开原则，通过公开推选、专家评审团、网上票选以及专业研究机构资料评审等环节，最终评选出六大榜单，分别是房产类：《2020中国十大地产年度CEO》、《2020中国地产经理人100强》；家居类：《2020中国十大家居年度CEO》、《2020中国家居品牌经理人100强》；物业类：《2020中国十大物业年度CEO》、《2020中国物业经理人100强》，并在12月12日举办盛大的颁奖典礼。', '文章来源:乐居财经']" }, { news_id: 'xinhua_1125905988', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905988.htm', title: '市场分化增速放缓 地价近十年来首降', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '受新冠肺炎疫情影响，土地市场在放缓的同时渐趋分化。', img: 'empty', content: "['受新冠肺炎疫情影响，土地市场在放缓的同时渐趋分化。中国土地勘测规划院日前发布《2020年第一季度全国主要城市地价监测报告》显示，一季度全国地价整体运行平稳，各用途地价环比、同比增速持续放缓，商服、工业地价较上一季度略有下降。', '数据显示，一季度，全国主要监测城市地价增速环比为0.09%，较上一季度下降0.45个百分点。商业服务、住宅、工业地价环比增速依次为-0.22%、0.34%、-0.08%。', '其中，36个重点监测城市中，综合地价环比增速为0.17%，较上一季度下降0.25个百分点，增速连续3个季度放缓；同比增速为2.81%，较上一季度下降1.10个百分点，增速连续9个季度放缓。', '中国土地勘测规划院地价所所长赵松表示，在突发疫情的阶段性压力下，主要经济指标明显下降，各用途地价增速持续放缓，商服、工业地价出现近10年来的首次环比下降。', '4月17日，国家统计局公布的数据显示，一季度房地产开发企业土地购置面积和土地成交价款同比分别下降22.6%、18.1%。', '应引起注意的是，一线城市的优质地块在整体市场放缓环境下，仍然热度不小，使得市场实际上分化加剧。比如，今年一季度，上海和北京土地市场成交额居全国第一和第二位。在北京，因2019年不少供地对价格进行了限制，而今年一季度“不限价”地块频频开拍，吸引了众多房地产商关注。数据显示，一季度北京共成交16宗经营性用地，总成交金额为671.88亿元，创近5年同期新高。', '中国指数研究院统计数据显示，一季度北京的土地成交楼面价约为34864元/平方米；其中，住宅用地的成交楼面价约为37057元/平方米，同比上涨约81%。', '专家表示，当前房企融资环境有所改善，3月份多数房企销售量回升，因此开发商加大了对优质地块的布局。', '赵松表示，预计今年第二季度，全国城市地价稳中小幅波动，部分城市住宅地价增速持续回落，商服、工业地价的调整幅度或将相对明显。', '同时，有关专家表示，受资金面改善、需求恢复叠加地方供地力度加大等影响，二季度热点区域土地市场交易热度有望进一步回升，下一步土地市场将延续分化态势，人口流入多、区域发展前景好的城市将成为热点；多数三四线城市则仍以消化库存为主，土地市场可能相对低迷。']" }, { news_id: 'qq_20201028A01PVR00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVR00.html', title: '扎区开展纪念中国人民志愿军抗美援朝出国作战70周年系列活动', source: 'qq', category: 'edu', media: '魅力满洲里', tags: '退役军人事务局,扎赉诺尔区,抗美援朝战争,中国人民志愿军', pub_date: '2020-10-28 08:08:49', summary: '铭记英雄伟绩，矢志强军兴军。10月26日，扎赉诺尔区退役军人事务局与区人民武装部联合组织开展了纪念中国人民志愿军抗美援朝出国作战70周年系列活动，传承革命精神。座谈中，扎赉诺尔区退役军人事务局负责人……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681290511/1000', content: "['铭记英雄伟绩，矢志强军兴军。10月26日，扎赉诺尔区退役军人事务局与区人民武装部联合组织开展了纪念中国人民志愿军抗美援朝出国作战70周年系列活动，传承革命精神。', '座谈中，扎赉诺尔区退役军人事务局负责人首先表达了社会各界对参加过抗美援朝战争老战士的崇高敬意和关怀之情，再一次阐述了抗美援朝精神的伟大历史意义。活动邀请的3位抗美援朝老战士讲述了自己在战场上的经历，追忆战火青春，讲述红色故事。虽然老人们年事已高，但依旧精神矍铄，说起那场战争记忆犹新，纷纷用朴实的语言回顾亲身经历赴朝作战的点滴事迹和深切感受。', '70年前，鸭绿江边战火纷飞，“三八线”上硝烟弥漫，为了保家卫国，无数英雄血洒战场，志愿军将士英勇顽强、舍生忘死的精神，给我们留下了最为宝贵的精神财富。', '扎赉诺尔区人民武装部副部长文治说 ：“抗美援朝战争是一场中国人民保家卫国，维护世界和平的正义战争，今天通过聆听老前辈讲述他们的英雄事迹，让我内心无比激动和振奋，作为新时代的革命军人必须赓续传承先辈的血性胆气，弘扬抗美援朝精神，用军人的血性区诠释人民军队从胜利走向胜利的胜战基因，为建设强大的人民军队贡献自己的力量。”', '座谈后，抗美援朝老战士们一同参观了扎赉诺尔区退役军人服务中心和第四街道办事处党建展厅，并重温了军人誓词，以此弘扬伟大的抗美援朝精神，切实担负起党和人民赋予的新时代使命任务。', '扎赉诺尔区退役军人事务局局长吴晓峰说：“今天我们邀请部分参加过抗美援朝出国作战的老兵来到我们退役军人事务局进行参观、组织座谈，其目的就是几年中国人民志愿军抗美援朝出国作战70周年。70年前，由中华优秀儿女组成的中国人民志愿军，肩负着人民的重托，高举保卫和平、反抗侵略的正义旗帜，雄赳赳、气昂昂、跨国鸭绿江，历经两年零九个月艰苦卓绝的浴血奋战，赢得了抗美援朝战争的伟大胜利。作为为广大退役军人服务的政府工作部门，我们要继承发扬这种伟大抗美援朝精神，立足本职岗位，做好自己的本质工作，更好地服务和保障好广大退役军人。”', '来源：扎赉诺尔区融媒体中心', '平台编辑：李丽娟']" }, { news_id: 'xinhua_1125905994', news_url: 'http://www.jx.xinhuanet.com/2020-04/26/c_1125905994.htm', title: '公租房违规首次纳入银行征信系统', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-04-26 08:58:18', summary: '近日，广东省住房和城乡建设厅与人民银行广州分行签订了《合作备忘录》，首次将公租房违规信息纳入人民银行征信系统。', img: 'empty', content: "['广东省住房和城乡建设厅与银行签订《合作备忘录》', '公租房违规首次纳入银行征信系统', '近日，广东省住房和城乡建设厅与人民银行广州分行签订了《合作备忘录》，首次将公租房违规信息纳入人民银行征信系统。记者走访了解到，在广州已有公租房小区采取了“人脸识别”技术，为租户提供便利同时，也确保只有承租人和同住人员才能进入楼栋。', '违规转租或影响个人征信', '2019年，全省通过公租房和租赁补贴新增保障困难群众1.86万户，惠及市民超过6万人；累计保障73.9万户，惠及市民近240万人。但是，广东省公租房在发挥很好保障成效的同时，也面临着收租难、清退难等难题。', '此次广东省首次将公租房违规行为纳入人民银行征信系统，进一步明确了公租房只能用于符合条件的申请家庭自住。对于违规申请和享受公租房、租赁补贴，或存在转租转借、空置、擅自装修等违规使用的家庭，住房保障主管部门除依据《公共租赁住房管理办法》《广东省城镇住房保障办法》等规定予以行政处罚外，还将其处罚信息纳入人民银行征信系统。一旦纳入，将影响违规对象后续5年的金融行为。', '此次签署《合作备忘录》，省住建厅与人民银行广州分行还将建立定期沟通机制，反馈数据应用成效，并积极推动其他相关信息数据的合作。同时，为加强规范管理，广东省还建立了公示制度。', '省住建厅相关负责人表示，相信通过此次信用体系建设，震慑公租房违规行为，进一步规范发展广东省公租房，逐步培养住房保障对象遵法守法的意识。', '人脸识别“黑科技”当管家', '广州向来重视保障房的审核分配以及运营工作，2018年7月，为了进一步做好后期运营和服务，广州市住保办将广州市保障性住房移交给两家国有租赁公司管理，由两家市场化程度更高的公司负责保障性住房的事务性管理和服务。记者近日在走访时发现，在国有租赁公司的管理下，不少公租房小区服务水平有了很大提升，而广州城投住房租赁发展投资有限公司还运用人脸识别“黑科技”，不但提升了租户居住安全性、便利度，还保证政策性保障房规范管理。', '在位于黄埔区水西路的萝岗和苑大型保障房小区，记者注意到，一位租户戴着口罩，手里拎着两袋刚采购的蔬菜，走到了单元门口，但他并没有放下手里的袋子并用门禁卡开门，而是朝旁边的一个屏幕上望了一望，只听到“嘀”的一声，单元的玻璃门就自动打开了。', '原来，萝岗和苑保障房小区已经告别了传统的门卫“人眼识别”，进入到“人脸识别”阶段。据了解，去年8月，小区就在单元楼大厅安装人脸识别装置，租户在线上传承租人和同住人员的照片信息，并进行实名认证，经审核通过，获得门禁使用权限，才能正常进入楼栋。“以前有时候出门匆忙，忘了带门禁卡，进不了门，现在就不怕忘带卡的事啦！”一位租户告诉记者。', '据广州城投住房租赁发展投资有限公司的相关负责人介绍，目前大多数指纹识别、IC门禁卡或身份证件都有被冒用伪造的风险，而人脸识别是依据人的面部特征数据进行的，数据信息的独一无二性将伪造信息的可能性降至最低。（全媒体记者贾政 通讯员岳建轩）']" }, { news_id: 'qq_20201028A01PVT00', news_url: 'https://new.qq.com/omn/20201028/20201028A01PVT00.html', title: '保定检法联手 力促行政争议实质性化解', source: 'qq', category: 'politics', media: '河北检察', tags: '保定,保定市检察院,涿州市', pub_date: '2020-10-28 08:09:33', summary: '河北检察公众号ID：hbsjcy近日，保定市检察院、保定市中级法院与涿州市检察院、涿州市法院以及保定莲池区法院组成联合办案组，针对一起工商行政登记纠纷行政争议案件，在涿州市行政争议化解中心召开行政争……', img: 'https://inews.gtimg.com/newsapp_bt/0/12681291106/1000', content: "['公众号ID：hbsjcy', '近日，保定市检察院、保定市中级法院与涿州市检察院、涿州市法院以及保定莲池区法院组成联合办案组，针对一起工商行政登记纠纷行政争议案件，在涿州市行政争议化解中心召开行政争议诉前化解现场会。', '张某在申请廉租房资格复核时发现被他人冒用身份办理了公司法定代表人变更登记，导致其无法获得廉租房资格，遂起诉至法院请求撤销。经双方当事人同意，保定市检察院联合市法院共同开展了行政争议实质性化解工作。保定市、涿州市检察院与涿州市市场监督管理局、行政审批局等部门多次沟通协调，对案件相关情况进行调查核实后决定召开行政争议诉前化解现场会。', '诉前化解现场会由保定市检察院第七检察部副主任郭磊主持。现场会上，张某陈述了事实、理由及依据，相关行政机关就行政登记调查结果及办理程序进行了说明；联合办案组、人民监督员就案件事实向双方发问。经过充分沟通讨论，双方当事人对案件事实达成了共识，行政机关当场表示将依法定程序为张某办理撤销登记，行政争议得以实质性化解。与会人员一致认为，检察院参与开展行政争议化解工作，是实质性化解行政争议的客观需要，为人民群众提供了多元的争议解决途径，真正实现了双赢多赢共赢。', '保定市检察院副检察长王秀英在总结时指出，检察机关始终把保障人民群众合法权益，解决人民群众的操心事、烦心事、揪心事放在重要位置，同法院联合召开行政争议诉前化解现场会，旨在共同促进行政争议实质性化解，推动“诉源治理”，从源头上化解社会矛盾，有利于促进社会和谐稳定。保定市法院副院长高宏参会并讲话。']" }, { news_id: 'xinhua_1126105637', news_url: 'http://www.jx.xinhuanet.com/2020-06/12/c_1126105637.htm', title: '能不能做出“低盐香肠”？', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-06-12 10:38:08', summary: '高盐是现代人最大的健康风险因素之一。', img: 'empty', content: "['热播的美食纪录片《风味人间2》的第七集《香肠万象集》，呈现了世界各地的各种香肠。关注过香肠制作或者营养标签的人可能会发现：各种香肠中，往往都会加入相当多的盐。实际上，不仅是香肠，其他的加工肉制品，比如火腿肠、午餐肉、肉饼、肉丸子等等，也都会做得很咸。', '高盐是现代人最大的健康风险因素之一。高盐饮食会明显增加高血压的风险，饮食指南中建议每天摄入的食盐不超过6克(并且这个6克还包括食物中其他来源的钠)，而高血压病人还要控制得更低。', '而实际上，多数人的摄入量都大大超过推荐的“控制量”。比如中国，很多地区人们的平均摄入量大致在每天10克。', '所以，中国营养学会把“减盐”作为健康饮食的“三减”之一来提倡和推动。', '在各种食品都在积极寻求“减盐”的大趋势下，不仅仅是香肠这些“传统食品”，火腿肠、午餐肉等各种“加工食品”也都很少有这方面的努力。这是为什么呢?', '简单的答案是：肉制品中的盐，除了产生咸味，还有更加重要的功能!', '食盐加脱水', '是肉制品防腐的关键', '肉制品很容易被致病细菌污染，一些细菌分泌的毒素毒性非常强。高盐对抑制细菌生长有明显作用。比如肉毒杆菌分泌的肉毒素，有过许多致死的案例。所以，防腐是肉制品需要首先考虑的问题。', '盐具有一定的防腐能力。当然，肉制品中不能只靠盐来防腐，那样就实在太咸了。现代食品中，是通过多种防腐手段的组合，在达到防腐目标的前提下尽可能减小对食物安全、风味、口感的影响。比如亚硝酸盐，就是对付肉毒杆菌最有效的防腐剂。而乳酸钠、二乙酸钠配合食盐，则对李斯特菌更为高效。如果降低了食盐用量，就需要添加更多的其他防腐剂，这是消费者更不愿意的。', '传统香肠中基本上不会采用其他的防腐剂，食盐加脱水是防腐的关键。', '肉制品口感的形成跟盐关系密切', '加工肉制品需要结合尽可能多的水，才能有良好的口感。', '要结合更多的水，一方面需要盐使得肌肉纤维吸水膨胀，吸收的水才能被肌肉牢牢抓住，在后续的加热中不流失。另一面，需要肉中的蛋白质溶解出来，互相链接形成蛋白胶，把水固定在这些蛋白质形成的胶中。溶解出来的蛋白质越多，结合的水就越多。盐可以促进更多的蛋白质溶解出来，通常在火腿肠类的肉制品中要用到2%左右。这个食盐用量已经很咸，但对保水而言往往还不够，所以要经常加入保水能力更强的磷酸盐。其实磷也是人体需要的元素，只是人们从正常饮食中得到的磷已经足够多，所以并不希望再通过添加来摄入更多的磷。', '咸味和鲜味互相成就', '跟肉相比，香肠有特别的香味。这种“香味”是各种风味物质的组合，其中最重要的是氨基酸与核苷酸带来的鲜味。在腌制和干燥的过程中，肉中的蛋白质会释放出谷氨酸等鲜味氨基酸，以及肌苷酸等呈味核苷酸。这些物质共同作用，使得香肠比新鲜的肉更“鲜”。而盐带来的咸味，跟鲜味也会产生协同，让对方的味道更为浓郁。', '千百年的经验，前人们不知道其中的原理，但总结出了足够的经验：香肠要好吃，食盐不可少。', '美味的香肠，跟培根、火腿等一样，也是“加工肉制品”。世卫组织总结的数据显示：长期每天吃50克加工肉制品，大肠癌的风险增加18%。一般人群的大肠癌风险大约是2%，增加18%之后大约为2.4%——在这些食物的美味和“确实存在但并不算大”的风险增加之间，吃还是不吃，就需要自己去权衡抉择了。']" }, { news_id: 'xinhua_1126105645', news_url: 'http://www.jx.xinhuanet.com/2020-06/12/c_1126105645.htm', title: '后疫情时代 用吃增强身体这座“城防工事”', source: 'xinhua', category: 'other', media: '新华网', tags: 'unknown tags', pub_date: '2020-06-12 10:38:08', summary: '除了我们做好日常的防范工作外，还有什么能让自己在这场战疫中立于不败之地呢？', img: 'empty', content: "['随着国内疫情持续好转，人们的生活逐渐步入正轨，但国外疫情依旧严峻，疫情防控依旧不能掉以轻心。除了我们做好日常的防范工作外，还有什么能让自己在这场战疫中立于不败之地呢？', '解放军总医院第三医学中心博士生导师、中华医学会科学普及分会前任主任委员王立祥表示，提升免疫力是抵抗病毒入侵最好的武器。', '王立祥表示，当病毒、细菌等致病微生物侵袭时，人体也并非那么不堪一击。他介绍，人体的皮肤黏膜屏障可以隔离掉90%左右的外来侵害。当病毒突破皮肤黏膜屏障后，身体分泌出的黏液中所含的杀菌物质和吞噬细胞起到杀灭病菌的作用。而逃过这一灭杀的细菌，还会受到身体所产生的抗体的灭杀。因此，抵抗病毒，建设好身体这座“城防工事”才是最重要的。', '如何来保护机体的健康，牢固“城防工事”呢?王立祥认为，首先要努力保护和呵护身体皮肤和黏膜的完整性，尽量规避呼吸道粘膜、口腔黏膜等损伤是防范病毒入侵最直接的屏障。其次要养成好的生活习惯非常重要，保证合理的膳食是第一位的。皮肤黏膜、各种防御细胞最基本的营养素便是蛋白质，如果吃不好，免疫战斗力就无从谈起。因此，应合理搭配谷类、肉类、蔬菜类这三大物质，保证充足的营养摄入。', '合理饮食能让身体的免疫大军养足战斗力，捍卫身体健康。军事医学科学院食品与营养系博士芮莉莉在接受《生命时报》采访时给大家开出一个饮食秘方。即每天1碗杂粮粥;每天1种红肉;每天1杯酸奶;每天1种高维生素C水果;每天1份菌类;每天1份橙黄色果蔬。', '芮莉莉介绍，每天1碗杂粮粥有利于提高机体免疫力。因为糙米、燕麦、小米、红豆、绿豆等未精制的杂粮含有丰富的B族维生素和多种矿物质，精制过的白米饭、白面条、馒头等主食中这些营养素含量很少。人体需要大量的B族维生素供应细胞进行增殖、氧化和还原作用，尤其是维生素B2、维生素B5(又称泛酸)、维生素B6及叶酸和维持细胞黏膜健康及制造抗体等免疫功能有关。', '每天1种红肉有助于免疫系统发育。牛肉、猪肉、羊肉等红肉富含优质蛋白和铁，而优质蛋白是机体免疫功能的物质基础，如果摄入不足会影响组织修复，使皮肤和黏膜的局部免疫力下降，容易造成致病菌的繁殖和扩散，降低抗感染能力;铁元素的缺乏可导致免疫细胞数量减少，进而影响抗体产生，导致免疫反应缺陷。红肉还含有一定量的锌，这种营养素是人体内100余种酶的组成成分，尤其对免疫系统发育和正常免疫功能维持有不可忽视的作用。需要注意的是，红肉吃多了会增加罹患心脏病等疾病的危险，成年人一周最多吃500克。', '每天1杯酸奶能激活全身的免疫系统功能。国内外研究表明，喝酸奶可以激活全身的免疫系统功能，抑制肿瘤。与普通牛奶相比，其中的蛋白质更易吸收，发酵后产生的乳酸还能抑制有害微生物的繁殖，促进胃肠蠕动和消化液的分泌，提高多种矿物质的吸收率，特别适合免疫力低下的老人和儿童食用。喝酸奶没有特定的时间限制，两餐之间或者饭前都可以。', '每天1种高维生素C水果能促进机体抗体形成。抗氧化物质维生素C能减少外界对人体细胞内平衡的干扰，促进抗体形成，维持正常免疫力。另外，维生素C能帮助胶原蛋白生成，让细胞之间互相紧紧聚在一起，减少细菌及病毒入侵的机会。富含维生素C的水果有鲜枣、猕猴桃、草莓、木瓜等。', '每天1份菌类有助提高人体巨噬细胞吞噬细菌等入侵者的战斗力。研究表明，香菇等菌类食物中富含的菌类多糖有助提高人体巨噬细胞吞噬细菌等入侵者的战斗力，从而帮助提升免疫力。研究显示，每天吃1份(约113克)香菇，4周后，免疫力明显提升。菌类还富含膳食纤维、氨基酸、维生素和矿物质，营养价值高，且有助降低血脂、胆固醇，清理血液杂质。', '每天1份橙黄色果蔬增强机体防病毒能力。维生素A对免疫系统有重要作用，一旦缺乏可引起呼吸、消化、泌尿、生殖上皮细胞角化变性，容易受细菌侵入，增加呼吸道、肠道感染疾病的风险。富含维生素A的食物主要是动物肝脏，植物性食物只能提供类胡萝卜素，可在体内转换为维生素A。类胡萝卜素主要存在于橙黄色果蔬中，如胡萝卜、芒果、红薯、南瓜等。']" }, { news_id: 'xinhua_1126136949', news_url: 'http://www.jx.xinhuanet.com/2020-06/19/c_1126136949.htm', title: '手足口病儿童、成人都会“中招” 但疫苗保护率可达95%', source: 'xinhua', category: 'other', media: '新华网', tags: '手足口病,中招,疱疹性咽峡炎,传播系数,保护率', pub_date: '2020-06-19 23:28:52', summary: '在这高发季节，必须时刻提高警惕，采取必要的预防措施，让孩子远离病毒。', img: 'http://www.xinhuanet.com/health/2020-06/11/1126099629_15918354323911n.jpg', content: "['受访者供图', '随着夏季气温的升高，婴幼儿感染手足口病进入高发期。中国疾控中心流行病学首席科学家曾光教授近日表示，手足口病传播系数高达4.2—6.5，是新冠病毒的3倍。2018年全国法定传染病报告发病中，手足口病以发病人数237.6万位居第一。', '近日，江苏常州第二人民医院、扬州大学附属医院等医院的专家表示，手足口病是夏秋易高发的一种常见传染病，且传染性强，少数重症甚至危及生命。', '早期症状与流感类似', '“手足口病（HFMD）是由肠道病毒（EV）感染引起的一种儿童常见传染病。”扬州大学附属医院儿科副主任医师徐金梅说，主要病毒的血清型包括柯萨奇病毒（CV）A组4—7、9、10、16型和B组1—3、5型，埃可病毒的部分血清型和肠道病毒71型（EV-A71）等，其中以CV-A16和EV-A71最为常见，重症及死亡病例多由EV-A71所致。', '专家介绍，手足口病有周期性流行的趋势，夏秋季比较常见，3岁或3岁以下婴幼儿手足口病发病率最高，并且能够引起局部流行。从临床看来，大龄儿童和成人有时候也会“中招”，切不可掉以轻心。', '手足口病以发热，手、足、口腔、臀部皮肤疱疹为主要临床特征，可伴有咳嗽、流涕、食欲不振等症状。但部分病例仅表现为皮疹或疱疹性咽峡炎，个别病例可无皮疹。典型皮疹则表现为斑丘疹、丘疹、疱疹。皮疹周围有炎性红晕，疱疹内液体较少，不疼不痒，皮疹恢复时不结痂、不留疤。', '需要引起注意的是，由于手足口病早期症状的发热、咳嗽、流涕等与流感类似，很容易被忽视。徐金梅说：“手足口病和流感都是病毒感染，都可能会有发热、咳嗽、乏力、流涕、咽部不适、食欲不振等症状。但是真正典型症状是不一样的，手足口病会出现手足、口腔部位皮疹，流感没有此症状。”', '隐性感染者为主要传染源', '手足口病传染性强，其传染源是什么？徐金梅告诉记者，手足口病患儿和手足口病隐性感染者为主要传染源，手足口病隐性感染率高。肠道病毒在湿热的环境下容易生存，且可通过感染者的粪便、咽喉分泌物、唾液和疱疹液等广泛传播。', '“手足口病可通过密切接触或呼吸道飞沫传播。通过接触被病毒污染的手、毛巾、手绢、牙杯、玩具、食具、奶具以及床上用品、内衣等引起感染；饮用或食入被病毒污染的水和食物后亦可感染。尤其当孩子发高烧、出皮疹的时候，传染性最强。”徐金梅说，手足口病的易感人群是婴幼儿和儿童，以学龄前儿童为主。因此，有幼儿的家庭要特别注意。', '专家提醒，无论是学校还是家庭中，一旦发现或确诊为手足口病，也不必过于紧张，要立即切断传播途径，做到早隔离、早治疗。患者要根据不同程度的症状，配合医生采取正确的治疗方法。特别是居家治疗的患儿避免与其他儿童接触，以减少交叉感染。同时，患儿的衣物也要及时晾晒或消毒，对患儿粪便及时消毒处理。', '高发季节要做到防治为先', '专家介绍，每年都有不少孩子被手足口病侵害。所以在这高发季节，必须时刻提高警惕，采取必要的预防措施，让孩子远离病毒。', '如何预防手足口病？“一般预防措施：勤洗手、吃熟食、喝开水、常通风、晒太阳。”徐金梅说，保持良好的个人卫生习惯是预防手足口病的关键。勤洗手，不要让儿童喝生水，吃生冷食物。儿童玩具和常接触到的物品应定期进行清洁消毒。避免儿童与患手足口病儿童密切接触。', '徐金梅告诉记者，在预防手足口病方面，最有效的方式是接种疫苗。目前，EV-A71型灭活疫苗可用于6月龄—5岁儿童，预防EV-A71感染所致的手足口病，基础免疫程序为2剂次，间隔1个月，鼓励在12月龄前完成接种。接种预防疫苗，保护率可达95%。疫苗的保护作用会因个体差异而略有不同，但及时接种疫苗可在人群中形成免疫屏障，能有效预防手足口病重症的发生。', '专家还表示，要加强医院感染控制：医疗机构应积极做好医院感染预防和控制工作。由于多种肠道病毒都可以致手足口病，因此得过一次手足口病的宝宝可能因感染不同病毒或者不同的血清型，导致多次发病。（记者 过国忠）']" }, { news_id: 'qq_20201028A01PW200', news_url: 'https://new.qq.com/omn/20201028/20201028A01PW200.html', title: '华夏可转债A基金净值上涨1.31％ 请保持关注', source: 'qq', category: 'finance', media: '基金异动', tags: '可转债a,基金,华夏', pub_date: '2020-10-28 08:10:17', summary: '腾讯基金10月27日讯，华夏可转债A基金（代码001045）公布最新净值，数据显示，华夏可转债A净值上涨1.31%。本基金单位净值为1.389元，累计净值为1.389元。华夏可转债A基金近一周下跌0……', img: 'empty', content: "['腾讯基金10月27日讯，华夏可转债A基金（代码001045）公布最新净值，数据显示，华夏可转债A净值上涨1.31%。本基金单位净值为1.389元，累计净值为1.389元。', '华夏可转债A基金近一周下跌0.71%，近一个月上涨7.67%，近一年上涨36.98%，基金成立以来累计上涨38.9%。', '华夏可转债A基金成立于2016-09-27，业绩比较基准为100.0％×中证可转换债券指数。', '该基金基金经理为何家琪。', '2020年三季报该基金实现收益1164.45万元，报告期净值增长率为11.09%，报告期末基金份额总额为19316.84万份。']" }] } }
})
