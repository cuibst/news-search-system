from scrapy import Spider, Request


class XinhuaNewsNodeSpider(Spider):
    # 此爬虫遍历nodeid，寻找有新闻列表的api界面
    # http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=10
    name = 'xinhua_news_node'
    allowed_domains = ['qc.wa.news.cn']
    start_urls = ['http://qc.wa.news.cn/nodeart/list?nid=' + str(i) + '&pgnum=1&cnt=10' for i in range(11100000, 11200000)]
    url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
    url_suffix = '&pgnum=1&cnt=10'

    f = open('data/xinhua/debug/valid_node_11100000_11200000.txt', 'w', encoding='utf-8')

    def parse(self, response):
        if(len(response.body) > 100):
            self.f.write(response.request.url + '\n')
