from crawler.crawler.spiders.qq import QqNewsInfoSpider
from scrapy.http import HtmlResponse, Request
from crawler.crawlertest.cases.test_qq.conftest import resource_get
import re


class Test_QQ:

    def test_qq_news_info_spider(self, resource_get):
        spider = QqNewsInfoSpider()
        key_list = ['title', 'category', 'media', 'pub_date', 'news_id', 'source', 'news_url', 'content']
        for url in spider.start_urls:
            response = resource_get(url)
            result = spider.parse(response)
            news_num = 0
            for request in result:
                news_num += 1
                if(news_num >= 2):
                    news_num = 0
                    break
                # 检查request url是否符合腾讯新闻形式
                print('##### check for ', request.url, ' started #####')
                assert re.match(r'https://new\.qq\.com/omn/20\d{6}/20\d{6}\w+\.html', request.url)
                response = resource_get(request.url)
                parse_item_res = spider.parse(response)
                for item in parse_item_res:
                    for key in key_list:
                        assert key in item

