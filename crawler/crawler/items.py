# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
'''
The models for scrapy crawler
'''

import scrapy


class NewsItem(scrapy.Item): # pylint: disable=too-many-ancestors
    '''
    The Scrapy item for news.
    '''
    news_id = scrapy.Field()
    news_url = scrapy.Field()
    title = scrapy.Field()
    source = scrapy.Field()
    category = scrapy.Field()
    media = scrapy.Field()
    tags = scrapy.Field()
    pub_date = scrapy.Field()
    summary = scrapy.Field()
    img = scrapy.Field()
    content = scrapy.Field()
