from crawler.crawler.spiders.xinhua import XinhuaNewsFullSpider, XinhuaIncSpider
from crawler.crawler.spiders.xinhua import parse_news_item, parse_news_url
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test.conftest import resource_get
import re


def test_xinhua_parse_news_item_valid_01(resource_get):
    test_url = 'http://www.xinhuanet.com/finance/2020-10/20/c_1126631701.htm'
    response = resource_get(test_url, request=Request(url=test_url))
    result = parse_news_item(response)
    key_list = ['news_id', 'news_url', 'title', 'source', 'category', 'media',
                'tags', 'pub_date', 'summary', 'img', 'content']
    for item in result:
        for key in key_list:
            assert key in item


def test_xinhua_parse_news_url_valid_01(resource_get):
    test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100'
    response = resource_get(test_url, request=Request(url=test_url))
    result = parse_news_url(response)
    for request in result:
        assert request.url


class TestXinhuaNewsFullSpider:
    spider = XinhuaNewsFullSpider()

    def test_xinhua_full_start_requests_valid_01(self):
        result = self.spider.start_requests()
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=1&cnt=100', request.url)

    def test_xinhua_full_parse_valid_01(self, resource_get):
        test_url = 'http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=1&cnt=100', request.url)
        request = next(result)
        assert re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=\d+&pgnum=2&cnt=100', request.url)


class TestXinhuaNewsIncSpider:
    spider = XinhuaIncSpider()

    def test_xinhua_inc_start_request_01(self):
        result = self.spider.start_requests()
        request = next(result)
        assert request.url == 'http://www.xinhuanet.com/'

    def test_xinhua_inc_parse_valid_01(self, resource_get):
        test_url = 'http://www.xinhuanet.com/'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        request = next(result)
        assert re.match(r'http://www\.xinhuanet\.com/\w+/20\d{2}-\d{2}/\d{2}/c_\d+\.htm', request.url)
