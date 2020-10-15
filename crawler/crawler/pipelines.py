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
from pathlib import Path

class NewsPipeline:
    '''
    The pipeline for crawling news.
    '''
    # 以后要将查重工作提前到爬取之前
    file_set = set()
    dir_path = None
    current_dir_path = Path(__file__).parent

    def open_spider(self, spider):
        '''
        Initialize the crawler
        '''
        # 确定要保存的文件夹路径
        if spider.name == 'qq_inc':
            self.dir_path = self.current_dir_path / Path('spiders/data/qq/debug/')
        elif spider.name == 'qq_news_info':
            self.dir_path = self.current_dir_path / Path('spiders/data/qq/news_info/')
        elif(spider.name == 'xinhua_news_full'):
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
            self.file_set.add(current_file_name)
            file = open(self.dir_path / Path(current_file_name), 'w', encoding="utf-8")
            content = json.dumps(dict(item), indent=4, ensure_ascii=False)
            file.write(content)
            file.close()
            return item
        return None
