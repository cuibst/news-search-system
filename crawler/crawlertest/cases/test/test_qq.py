from crawler.crawler.spiders.qq import QqNewsInfoSpider, QqIncSpider, QqFullSpider, parse_item
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test.conftest import resource_get
import re


def test_qq_parse_item_valid_01(resource_get):
    # 此测例检查parse_item函数能否处理正确的新闻url
    test_url = 'https://new.qq.com/omn/20201011/20201011A0BXRG00.html'
    response = resource_get(test_url, request=Request(url=test_url))
    result = parse_item(response)
    # 还没有summary
    key_list = ['title', 'category', 'media', 'pub_date', 'news_id',
                'source', 'news_url', 'content', 'tags', 'img', 'content']
    for item in result:
        for key in key_list:
            assert key in item


def test_qq_parse_item_not_valid_01(resource_get):
    # 此测例检查parse_item函数能否处理错误的新闻url
    test_url = 'https://new.qq.com/notfound.htm?uri=http://new.qq.com/omn/20201014/20201014A09RRZ00.html'
    response = resource_get(test_url, request=Request(url=test_url))
    result = parse_item(response)
    iter_num = 0
    for item in result:
        iter_num += 1
    assert iter_num == 0


class TestQqNewsInfoSpider:
    spider = QqNewsInfoSpider()

    def test_parse_valid_01(self, resource_get):
        # 此测例检查正确的新闻列表url
        test_url = 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=24hours' \
                    '&srv_id=pc&offset=0&limit=100&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is' \
                    '_filter%22:10,%22check_type%22:true}'
        responce = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(responce)
        for request in result:
            assert re.match(r'https://new\.qq\.com/omn/20\d{6}/20\d{6}\w+.*', request.url)

    def test_parse_not_valid_01(self, resource_get):
        # 此测例检查错误的新闻列表url，测试offset=200的情况
        test_url = 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=24hours' \
                    '&srv_id=pc&offset=200&limit=100&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is' \
                    '_filter%22:10,%22check_type%22:true}'
        responce = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(responce)
        iter_num = 0
        for item in result:
            iter_num += 1
        assert iter_num == 0


class TestQqIncSpider:
    spider = QqIncSpider()

    def test_inc_parse_valid_01(self, resource_get):
        # 此测例检查parse函数能否从起始url返回新闻链接
        test_url = 'https://www.qq.com/'
        response = resource_get(test_url, request=Request(url=test_url))
        result = self.spider.parse(response)
        for request in result:
            assert re.match(r'https://new\.qq\.com/omn/20\d{6}/20\d{6}\w+.*', request.url)

class TestQqFullSpider:
    spider = QqFullSpider()

    def test_full_start_requests_01(self):
        result = self.spider.start_requests()
        request = next(result)
        assert re.search(r'A0000000', request.url)
