# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
'''
The pipelines for scrapy crawler
'''

# useful for handling different item types with a single interface
import json
import os
import re
from pathlib import Path
import requests


class NewsPipeline:
    '''
    pipeline for post news
    '''
    # 以后要将查重工作提前到爬取之前
    file_set = set()
    dir_path = None
    current_dir_path = Path(__file__).parent
    news_list = []
    news_capacity = 10
    upload_news_url = 'https://news-search-system-rzotgorz.app.secoder.net/api/uploadnews/'


    def open_spider(self, spider):
        '''
        Initialize the crawler
        '''
        # 确定要保存的文件夹路径
        if re.match(r'qq_.+', spider.name):
            self.dir_path = self.current_dir_path / Path('spiders/data/qq/news_info/')
        elif re.match(r'xinhua_.+', spider.name):
            self.dir_path = self.current_dir_path / Path('spiders/data/xinhua/news_info/')
        # 获取文件夹中的所有文件
        if self.dir_path is not None:
            self.file_set = set(os.listdir(str(self.dir_path)))

    def process_item(self, item, spider): #pylint: disable=unused-argument
        '''
        The configuration for crawler to process each news item
        '''
        current_file_name = item['news_id'] + '.json'
        if current_file_name not in self.file_set:
            # 储存文件到本地
            self.file_set.add(current_file_name)
            self.dir_path.mkdir(parents=True, exist_ok=True)
            file = open(self.dir_path / Path(current_file_name), 'w', encoding="utf-8")
            content = json.dumps(dict(item), indent=4, ensure_ascii=False)
            file.write(content)
            file.close()
            # 向django后端发送post请求添加新闻
            if len(self.news_list) >= self.news_capacity:
                requests.post(url=self.upload_news_url, json={
                    'data': self.news_list
                }, headers={'Content-Type': 'application/json'}, timeout=100)
                self.news_list.clear()
            self.news_list.append(dict(item))
            return item
        return None

    def close_spider(self, spider):
        '''
        post remain news in self.news_pack
        '''
        print(spider.name, 'closed.')
        requests.post(url=self.upload_news_url, json={
            'data': self.news_list
        }, headers={'Content-Type': 'application/json'}, timeout=100)
