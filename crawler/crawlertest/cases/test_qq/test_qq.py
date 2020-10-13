from crawler.crawler.spiders.qq import QqNewsInfoSpider
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test_qq.conftest import resource_get
import re


class Test_QQ:

    def test_qq_news_info_spider(self, resource_get):
        spider = QqNewsInfoSpider()
        for url in spider.start_urls[:10]:
            response = resource_get(url)
            result = spider.parse(response)
            for request in result:
                # 检查request url是否符合腾讯新闻形式
                assert re.match(r'https://new\.qq\.com/omn/20\d{6}/20\d{6}\w+\.html', request.url)



