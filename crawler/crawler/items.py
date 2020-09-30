# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class NewsItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    news_url = scrapy.Field()
    source = scrapy.Field() # 来源网站，如'qq'
    title = scrapy.Field() # 新闻标题
    news_id = scrapy.Field() # 新闻id
    pub_date = scrapy.Field() # 发布日期，格式：'2020.09.27 13:57'
    content_text = scrapy.Field() # 正文段落，list
    content_picture = scrapy.Field() # 图片url，list

