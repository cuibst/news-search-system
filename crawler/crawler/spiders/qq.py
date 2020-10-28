#pylint: disable=line-too-long
'''
The crawler for news.qq.com
'''
import re
import json
from datetime import datetime, timedelta
from urllib import parse
from pathlib import Path
from scrapy.spiders import Request, Spider
from ..items import NewsItem
from .lib.itemparser import cat_gen

def parse_item(response):
    '''
    input response from nes url, yield news item
    :param response:
    :return:
    '''
    # 从新闻页爬取信息，存入data/qq/news_info/文件夹
    url = response.request.url
    script_list = response.xpath('/html/head//script/text()').extract()
    news_brief_info = None
    for script in script_list:
        if script.find('window.DATA = ') >= 0:
            news_brief_info = json.loads(script.lstrip('window.DATA = '))
            break
    item = NewsItem()
    try:
        item['title'] = news_brief_info['title']
        cat_dic = {
            'politics': ['politics', 'law'],
            'finance': ['finance', 'lottery'],
            'tech': ['tech', 'science', 'auto', 'digital'],
            'military': ['mil'],
            'social': ['social', 'society', 'cul'],
            'edu': ['edu', 'history'],
            'sports': ['sports'],
            'ent': ['ent', 'game', 'funny', 'comic'],
            'life': ['life', 'photography', 'baby', 'pet',
                     'lifestyle', 'weather', 'travel', 'food', 'health'],
            'house': ['house', 'houseliving']
        }
        item['category'] = cat_gen(news_brief_info['catalog1'], cat_dic)
        item['media'] = news_brief_info['media']
        item['pub_date'] = news_brief_info['pubtime']
        item['tags'] = news_brief_info['tags']
        item['news_id'] = 'qq_' + news_brief_info['cms_id']
        item['source'] = 'qq'
        item['news_url'] = url
        # summary
        summary = response.xpath('//meta[@name="description"]/@content').extract()
        if summary:
            item['summary'] = summary[0].strip()
        else:
            item['summary'] = ''
        item['content'] = []
        img_src = ''
        for one_p in response.xpath('//p[@class="one-p"]'):
            img = one_p.xpath('.//img/@src').extract()
            if len(img) > 0:
                if img_src == '':
                    img_src = parse.urljoin(url, img[0])
            item['content'] += [text for text in one_p.xpath('./text()').extract() if text.strip() != '']
        item['img'] = img_src
        yield item
    except (KeyError, ValueError, TypeError):
        # 删除了记录错误url的功能
        return


class QqIncSpider(Spider):
    '''
    The spider for qq news info
    '''
    name = 'qq_inc'
    allowed_domains = ['i.news.qq.com', 'new.qq.com']
    current_dir_path = Path(__file__).parent
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

    def parse(self, response, **kwargs):
        '''
        crawl the list of the news, and get summary
        '''
        # 爬取新闻信息列表，提取新闻的简要信息，存入data/qq/news_brief_info/文件夹
        try:
            data_list = json.loads(response.text)['data']['list']
        except (ValueError, KeyError, TypeError):
            return
        for data in data_list:
            dic = {}
            key_list = ['article_id', 'article_type', 'category_cn', 'create_time',
                        'category_id', 'category_name', 'cms_id', 'img', 'img_exp_type',
                        'media_id', 'media_name', 'publish_time', 'title', 'url']
            for key in key_list:
                dic[key] = data[key]
            if re.match(r'https://new\.qq\.com/omn/20\d{6}/20\d{6}\w+\.html', dic['url']):
                new_dir = self.current_dir_path / Path('data/qq/news_brief_info/')
                new_dir.mkdir(parents=True, exist_ok=True)
                file = open(new_dir / Path(dic['cms_id'] + '.json'), 'w', encoding='utf-8')
                file.write(json.dumps(dic, indent=4, ensure_ascii=False))
                file.close()
                yield Request(dic['url'], callback=parse_item)


class QqFullSpider(Spider):
    '''
    This spider generate all possible news urls and try to crawl them
    '''
    name = 'qq_full'
    allowed_domains = ['*']
    # 爬取2020全年10月28日及以前的新闻
    start_date = datetime(2020, 10, 28)
    end_date = datetime(2019, 12, 31)
    # https://new.qq.com/omn/20201020/20201020A0G0KM00.html

    def start_requests(self):
        '''
        Generate all possible news urls within the date range.
        '''
        date = self.start_date
        alphabet = [chr(i) for i in range(48, 58)] + [chr(i) for i in range(65, 91)]
        while date != self.end_date:
            # TO DO
            year = str(date.year)
            month = str(date.month).rjust(2, '0')
            day = str(date.day).rjust(2, '0')
            date_string = year + month + day
            iden_list = [0, 0, 0, 0]
            for iden in range(20*36**3):
                for i in range(4):
                    iden_list[3 - i] = iden % 36
                    iden //= 36
                iden_string = ''.join([alphabet[iden_list[i]] for i in range(4)])
                target_url = 'https://new.qq.com/omn/' + date_string + '/' + date_string + \
                    'A0' + iden_string + '00.html'
                yield Request(url=target_url, callback=parse_item)
            date = date - timedelta(days=1)

    def parse(self, response, **kwargs):
        pass
