# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
'''
The pipelines for scrapy crawler
'''

# useful for handling different item types with a single interface
from pathlib import Path
import requests


class NewsPipeline:
    '''
    pipeline for post news
    '''
    # 以后要将查重工作提前到爬取之前
    current_dir_path = Path(__file__).parent
    news_list = []
    news_capacity = 20
    upload_news_url = 'https://news-search-system-rzotgorz.app.secoder.net/api/uploadnews/'

    def open_spider(self, spider):
        '''
        called when the spider is open
        '''
        self.news_list.clear()
        print(spider.name, 'opened.')

    def process_item(self, item, spider): #pylint: disable=unused-argument
        '''
        The configuration for crawler to process each news item
        '''
        # 向django后端发送post请求添加新闻
        if len(self.news_list) >= self.news_capacity:
            requests.post(url=self.upload_news_url, json={
                'data': self.news_list
            }, headers={'Content-Type': 'application/json'}, timeout=100)
            self.news_list.clear()
        self.news_list.append(dict(item))
        return item

    def close_spider(self, spider):
        '''
        post remain news in self.news_pack
        '''
        print(spider.name, 'closed.')
        requests.post(url=self.upload_news_url, json={
            'data': self.news_list
        }, headers={'Content-Type': 'application/json'}, timeout=100)
