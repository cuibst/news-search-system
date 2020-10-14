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
