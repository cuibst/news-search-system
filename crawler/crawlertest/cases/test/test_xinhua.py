from crawler.crawler.spiders.xinhua import XinhuaNewsFullSpider
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test.conftest import resource_get
import re

class TestXinhuaNewsFullSpider:
    spider = XinhuaNewsFullSpider()

    def test_xinhua_full_start_requests_valid_01(self, resource_get):
        result = self.spider.start_requests()
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=1&cnt=100', request.url)

    def test_xinhua_full_parse_nid_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse_nid(response)
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=1&cnt=100', request.url)
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=2&cnt=100', request.url)

    def test_xinhua_full_parse_news_url_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse_news_url(response)
        for request in result:
            assert request.url

    def test_xinhua_full_parse_news_item_valid_01(self, resource_get):
        test_url = 'http://www.xinhuanet.com//world/2014-11/13/c_1113239219.htm'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse_news_item(response)
        key_list = ['news_id', 'news_url', 'title', 'source', 'category', 'media', 'tags', 'pub_date', 'summary',
                    'video', 'content']
        for item in result:
            for key in key_list:
                assert key in item

