from scrapy.spiders import CrawlSpider, Rule, Request, Spider
#from scrapy.linkextractors import LinkExtractor
#from scrapy.crawler import CrawlerRunner
#from scrapy.utils.log import configure_logging
#from scrapy.utils.project import get_project_settings
import time
import re


# 导包包含上级目录
import sys
import os
fpath = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ffpath = os.path.abspath(os.path.join(fpath, ".."))
print(ffpath)
sys.path.append(ffpath)


from crawler.items import NewsItem
import json
from selenium import webdriver
'''
class QqIncSpider(CrawlSpider):
    # 这是一个功能及其不完善的增量爬虫，使用chromedirver对首页进行爬取
    name = 'qq_inc'
    allowed_domains = ['qq.com', 'news.qq.com', 'sports.qq.com', 'new.qq.com']
    count_all = 0
    url_all = []
    start_urls = ['https://www.qq.com/']
    label_tags = ['爬虫', 'scrapy', 'selenium', 'selenium']
    rules = (
        Rule(LinkExtractor(allow=('.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*',)), callback='parse_item', follow=True),
        Rule(LinkExtractor(allow=('https://new[s]{0,1}.qq.com/.*',)), callback='follow', follow=True),
    )

    #browser = webdriver.Chrome(executable_path='chromedriver.exe')
    #browser.set_page_load_timeout(3)

    def parse_item(self, response):
        current_url = response.request.url
        pattern = '.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*'
        match_obj = re.match(pattern, current_url)
        item = NewsItem()
        item['source'] = self.name.split('_')[0]
        title = response.xpath('//h1/text()').extract()[0]
        try:
            item['news_url'] = current_url
            item['title'] = title
            item['news_id'] = match_obj.group(1)
            item['pub_date'] = response.xpath('//meta[@name="apub:time"]/@content').extract()[0]
            item['content_text'] = response.xpath('//p[@class="one-p"]/text()').extract()
            item['content_picture'] = response.xpath('//img[@class="content-picture"]/@src').extract()
            yield item
        except:
            pass


    def follow(self, response):
        pass
'''


class QqIncSpider(Spider):
    name = "qq_inc"
    allowed_domains = ['news.qq.com', 'new.qq.com']
    start_urls = ['https://www.qq.com/']
    total_error = 0

    browser = webdriver.Chrome(executable_path='chromedriver.exe')
    browser.set_page_load_timeout(10)

    def parse(self, response):
        href_list = response.xpath('//a/@href').extract()
        pattern = '.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*'
        for href in href_list:
            if(re.match(pattern, href) != None):
                yield Request(href, callback=self.parse_item)


    def parse_item(self, response):
        # 从新闻页爬取信息，存入data/news_info/文件夹
        current_url = response.request.url
        script_list = response.xpath('/html/head//script/text()').extract()
        news_brief_info = None
        for script in script_list:
            if (script.find('window.DATA = ') >= 0):
                news_brief_info = json.loads(script.lstrip('window.DATA = '))
                break
        item = NewsItem()
        try:
            item['title'] = news_brief_info['title']
            item['category'] = news_brief_info['catalog1']
            item['media'] = news_brief_info['media']
            item['pub_date'] = news_brief_info['pubtime']
            item['tags'] = news_brief_info['tags']
            item['news_id'] = news_brief_info['cms_id']
            item['source'] = self.name.split('_')[0]
            item['news_url'] = current_url
            item['content'] = []
            for one_p in response.xpath('//p[@class="one-p"]'):
                img = one_p.xpath('.//img/@src').extract()
                if (len(img) != 0):
                    item['content'] += ['img_' + src for src in img]
                else:
                    item['content'] += ['text_' + text for text in one_p.xpath('./text()').extract()]
            yield item
        except:
            # 如果出现错误，将出现错误的url追加存入error/error_url.txt文件
            error_f = open('data/error/error_url.txt', 'a', encoding='utf-8')
            error_f.write(str(self.total_error) + '_' + current_url + '\n')
            error_f.close()
            self.total_error += 1



class QqNewsInfoSpider(Spider):
    name = 'qq_news_info'
    allowed_domains = ['i.news.qq.com', 'new.qq.com']
    # 以下是腾讯新闻的不同新闻标签
    sub_srv_id_list = ['24hours', 'antip', 'bj', 'ent', 'milite', 'world', 'tech',
                       'finance', 'auto', 'fashion', 'photo', 'games', 'cul', 'finance_stock',
                       'house', 'comic', 'emotion', 'digi', 'astro', 'health', 'visit', 'baby',
                       'pet', 'history', 'politics', 'zfw', 'football', 'society', 'cul_ru',
                       'edu', 'finance_licai', 'sports', 'life', 'kepu', 'sh', 'gd', 'tj',
                       'hebei', 'cd', 'cq', 'xian', 'hn', 'hb', 'fj', 'henan', 'zj', 'ln',
                       'jiangsu']
    url_prefix = 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id='
    url_mid = '&srv_id=pc&offset='
    url_suffix = '&limit=100&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is_filter%22:10,%22check_type%22:true}'
    start_urls = []
    for sub_srv_id in sub_srv_id_list:
        for i in range(2):
            start_urls.append(url_prefix + sub_srv_id + url_mid + str(100*i) + url_suffix)
    total_error = 0

    def parse(self, response):
        # 爬取新闻信息列表，提取新闻的简要信息，存入data/qq/news_brief_info/文件夹
        try:
            list = json.loads(response.text)['data']['list']
        except:
            return
        for data in list:
            dic = {}
            key_list = ['article_id', 'article_type', 'category_cn', 'create_time',
                        'category_id', 'category_name', 'cms_id', 'img', 'img_exp_type',
                        'media_id', 'media_name', 'publish_time', 'title', 'url']
            for key in key_list:
                dic[key] = data[key]
            f = open('data/qq/news_brief_info/' + dic['cms_id'] + '.json', 'w', encoding='utf-8')
            f.write(json.dumps(dic, indent=4, ensure_ascii=False))
            f.close()
            yield Request(dic['url'], callback=self.parse_item)


    def parse_item(self, response):
        # 从新闻页爬取信息，存入data/qq/news_info/文件夹
        current_url = response.request.url
        script_list = response.xpath('/html/head//script/text()').extract()
        news_brief_info = None
        for script in script_list:
            if(script.find('window.DATA = ') >= 0):
                news_brief_info = json.loads(script.lstrip('window.DATA = '))
                break
        item = NewsItem()
        try:
            item['title'] = news_brief_info['title']
            item['category'] = news_brief_info['catalog1']
            item['media'] = news_brief_info['media']
            item['pub_date'] = news_brief_info['pubtime']
            item['tags'] = news_brief_info['tags']
            item['news_id'] = news_brief_info['cms_id']
            item['source'] = self.name.split('_')[0]
            item['news_url'] = current_url
            item['content'] = []
            for one_p in response.xpath('//p[@class="one-p"]'):
                img = one_p.xpath('.//img/@src').extract()
                if(len(img) != 0):
                    item['content'] += ['img_' + src for src in img]
                else:
                    item['content'] += ['text_' + text for text in one_p.xpath('./text()').extract()]
            yield item
        except:
            # 如果出现错误，将出现错误的url追加存入error/error_url.txt文件
            error_f = open('data/error/error_url.txt', 'a', encoding='utf-8')
            error_f.write(str(self.total_error) + '_' + current_url + '\n')
            error_f.close()
            self.total_error += 1


'''
runner = CrawlerRunner(get_project_settings())
configure_logging()

@defer.inlineCallbacks
def qq_inc_crawl():
    while True:
        print('qq_inc spider started')
        yield runner.crawl(QqIncSpider)
        time.sleep(30)
    reactor.stop()

qq_inc_crawl()
reactor.run()
'''

