from scrapy import Spider, Request
import json
import re


class XinhuaNewsNodeSpider(Spider):
    # 此爬虫遍历nodeid，寻找有新闻列表的api界面
    # http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=10
    name = 'xinhua_news_node'
    allowed_domains = ['qc.wa.news.cn']
    # 在此处指定搜索起点和终点的id号
    # 注意！此处为了提高性能使用的是硬编码，务必确保起点和终点的数字长度相等
    # 以后需要改成正则表达式！
    start = 110000
    end = 120000
    id_len = len(str(start))
    start_urls = ['http://qc.wa.news.cn/nodeart/list?nid=' + str(i) + '&pgnum=1&cnt=10' for i in range(start, end)]
    url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
    url_suffix = '&pgnum=1&cnt=10'

    f = open('data/xinhua/debug/valid_node_' + str(start) + '_' + str(end) + '.txt', 'a', encoding='utf-8')

    def parse(self, response, **kwargs):
        if(len(response.body) > 100):
            self.f.write(response.request.url[38:38+self.id_len] + '\n')


class XinhuaNewsInfoSpider(Spider):
    # 此爬虫打开节点api文件，爬取api提供的新闻列表，进而爬取相应的新闻页面
    name = 'xinhua_news_info'
    allowed_domains = ['*']
    url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
    url_suffix = '&pgnum=1&cnt=100'
    f = open('data/xinhua/debug/valid_node_11100000_11200000.txt', 'r', encoding='utf-8')
    nid_list = f.read().split('\n')
    f.close()
    f = open('data/xinhua/debug/news_url_11100000_11200000.txt', 'a', encoding='utf-8')
    start_urls = ['http://qc.wa.news.cn/nodeart/list?nid=' + nid +
                  '&pgnum=1&cnt=100' for nid in nid_list]

    def parse(self, response, **kwargs):
        if(len(response.text) < 100):
            return
        news_list = []
        try:
            news_list = json.loads(response.text[1:-1])['data']['list']
        except:
            return
        for sub_dic in news_list:
            if(sub_dic['LinkUrl'] != ''):
                self.f.write(sub_dic['LinkUrl'] + '\n')
        if(len(news_list) >= 100):
            pattern = r'http://qc\.wa\.news\.cn/nodeart/list\?nid=[0-9]+&pgnum=([0-9]+)&cnt=100'
            match_obj = re.match(pattern, response.request.url)
            if(match_obj):
                pgnum = int(match_obj.group(1))
                pgnum += 1
                prefix_match_obj = re.match(r'(http://qc\.wa\.news\.cn/nodeart/list\?nid=[0-9]+)&pgnum=[0-9]+&cnt=100', response.request.url)
                yield Request(prefix_match_obj.group(1) + '&pgnum=' + str(pgnum) + '&cnt=100', callback=self.parse, dont_filter=True)
