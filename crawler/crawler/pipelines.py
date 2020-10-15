# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json
import os
from pathlib import Path

class NewsPipeline:
    # 以后要将查重工作提前到爬取之前
    file_set = set()
    dir_path = None
    current_dir_path = Path(__file__).parent

    def open_spider(self, spider):
        # 确定要保存的文件夹路径
        if (spider.name == 'qq_inc'):
            self.dir_path = self.current_dir_path / Path('spiders/data/qq/debug/')
        elif (spider.name == 'qq_news_info'):
            self.dir_path = self.current_dir_path / Path('spiders/data/qq/news_info/')
        elif(spider.name == 'xinhua_news_info'):
            self.dir_path = self.current_dir_path / Path('spiders/data/xinhua/news_info/')
        # 获取文件夹中的所有文件
        if(self.dir_path != None):
            self.file_set = set(os.listdir(str(self.dir_path)))

    def process_item(self, item, spider):
        current_file_name = item['news_id'] + '.json'
        if(current_file_name not in self.file_set):
            self.file_set.add(current_file_name)
            f = open(str(self.dir_path) + current_file_name, 'w', encoding="utf-8")
            content = json.dumps(dict(item), indent=4, ensure_ascii=False)
            f.write(content)
            f.close()
            return item
        else:
            return
