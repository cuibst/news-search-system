# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class NewsItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    news_id = scrapy.Field()
    news_url = scrapy.Field()
    title = scrapy.Field()
    source = scrapy.Field()
    category = scrapy.Field()
    media = scrapy.Field()
    tags = scrapy.Field()
    pub_date = scrapy.Field()
    summary = scrapy.Field()
    video = scrapy.Field()
    content = scrapy.Field()
