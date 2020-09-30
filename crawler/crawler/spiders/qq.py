'''
import scrapy
import re
from crawler.items import NewsItem

class QqSpider(scrapy.Spider):
    name = 'qq'
    allowed_domains = ['qq.com', 'news.qq.com', 'sports.qq.com', 'new.qq.com']
    start_urls = ['https://news.qq.com/']
    total_count = 0

    def parse(self, response):
        if(self.total_count >= 100):
            return
        current_url = response.request.url
        alist = response.xpath('//a/@href').extract()
        pattern = '.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).html'
        match_obj = re.match(pattern, current_url)
        if(match_obj != None):
            self.total_count += 1
            item = NewsItem()
            item['source'] = self.name
            title = response.xpath('//h1/text()').extract()
            item['title'] = title[0]
            item['news_id'] = match_obj.group(1)
            year = response.xpath('//div[@class="year through"]/span/text()').extract()[0]
            md = response.xpath('//div[@class="md"]/text()').extract()[0]
            date_pattern = '.*"([0-9]{2})".*"([0-9]{2})".*'
            date_match_obj = re.match(date_pattern, md)
            month = date_match_obj.group(1)
            day = date_match_obj.group(2)
            time = response.xpath('//div[@class="time"]/text()').extract()[0]
            time_pattern = '.*"([0-9]{2})".*"([0-9]{2})".*'
            time_match_obj = re.match(time_pattern, time)
            hour = time_match_obj.group(1)
            minute = time_match_obj.group(2)
            pub_date = year+'.'+month+'.'+day+' '+hour+':'+minute
            item['pub_date'] = pub_date
            item['content_text'] = response.xpath('//p[class="one-p"]/text()').extract()
            item['content_picture'] = response.xapth('//img[class="content-picture"]/@scr').extract()
            yield item
        for href in alist:
            try:
                yield scrapy.Request(href, callback=self.parse)
            except:
                pass
'''

# CrawlSpider与Rule配合使用可以起到历遍全站的作用、Request干啥的我就不解释了
from scrapy.spiders import CrawlSpider, Rule, Request
# 配合Rule进行URL规则匹配
from scrapy.linkextractors import LinkExtractor
import re
from crawler.items import NewsItem
import json
from selenium import webdriver

class QqSpider(CrawlSpider):
    name = 'qq'
    allowed_domains = ['qq.com', 'news.qq.com', 'sports.qq.com', 'new.qq.com']
    count_all = 0
    url_all = []
    start_urls = ['https://www.qq.com/']
    label_tags = ['爬虫', 'scrapy', 'selenium', 'selenium']
    rules = (
        Rule(LinkExtractor(allow=('.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*',)), callback='parse_item', follow=True),
        Rule(LinkExtractor(allow=('https://new[s]{0,1}.qq.com/.*',)), callback='follow', follow=True),
    )

    browser = webdriver.Chrome(executable_path='chromedriver.exe')
    browser.set_page_load_timeout(30)

    def parse_item(self, response):
        current_url = response.request.url
        pattern = '.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*'
        match_obj = re.match(pattern, current_url)
        item = NewsItem()
        item['source'] = self.name
        title = response.xpath('//h1/text()').extract()
        try:
            item['news_url'] = current_url
            item['title'] = response.xpath('//title/text()').extract()[0]
            item['news_id'] = match_obj.group(1)
            item['pub_date'] = response.xpath('//meta[@name="apub:time"]/@content').extract()[0]
            item['content_text'] = response.xpath('//p[@class="one-p"]/text()').extract()
            item['content_picture'] = response.xpath('//img[@class="content-picture"]/@src').extract()
            yield item
        except:
            pass
    def follow(self, response):
        pass


