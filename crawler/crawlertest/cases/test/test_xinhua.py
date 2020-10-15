from crawler.crawler.spiders.xinhua import XinhuaNewsNodeSpider, XinhuaNewsUrlSpider, XinhuaNewsInfoSpider
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test.conftest import resource_get
import re

class TestXinhuaNewsNodeSpider:
    spider = XinhuaNewsNodeSpider()

    def test_node_parse_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=10'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        assert result == test_url

    def test_node_parse_not_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111000&pgnum=1&cnt=10'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        assert result is None

class TestXinhuaNewsUrlSpider:
    spider = XinhuaNewsUrlSpider()

    def test_url_parse_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        request = next(result)
        assert request.url == 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=2&cnt=100'

class TestXinhuaNewsInfoSpider:
    spider = XinhuaNewsInfoSpider()

    def test_news_info_parse_valid_01(self, resource_get):
        test_url = 'http://www.xinhuanet.com//world/2014-11/13/c_1113239219.htm'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        item = next(result)
        key_list = ['news_id', 'source', 'pub_date', 'title', 'media', 'news_url', 'category', 'tags', 'content']
        for key in key_list:
            assert key in item
