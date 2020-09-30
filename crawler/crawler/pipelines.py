# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json

class NewsPipeline:
    def process_item(self, item, spider):
        f = open('data/' + item['news_id'] + '.json', 'w', encoding="utf-8")
        content = json.dumps(dict(item), ensure_ascii=False)
        f.write(content)
        f.close()
        return item
