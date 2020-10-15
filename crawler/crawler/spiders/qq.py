#pylint: disable=line-too-long
'''
The crawler for news.qq.com
'''
import re
import json
from pathlib import Path
from scrapy.spiders import Request, Spider
from ..items import NewsItem



class QqIncSpider(Spider):
    '''
    The increment spider for news.qq.com
    '''
    name = "qq_inc"
    allowed_domains = ['news.qq.com', 'new.qq.com']
    start_urls = ['https://www.qq.com/']
    total_error = 0
    current_dir_path = Path(__file__).parent

    #browser = webdriver.Chrome(executable_path='chromedriver.exe')
    #browser.set_page_load_timeout(10)

    def parse(self, response, **kwargs):
        '''
        parse the url from the response
        '''
        href_list = response.xpath('//a/@href').extract()
        pattern = '.+/omn/2020[0-9]{4}/(2020[0-9]{4}[A-za-z0-9]+).*'
        for href in href_list:
            if re.match(pattern, href) is not None:
                yield Request(href, callback=self.parse_item)


    def parse_item(self, response):
        '''
        parse the response page and save it into data/news_info
        '''
        # 从新闻页爬取信息，存入data/news_info/文件夹
        current_url = response.request.url
        script_list = response.xpath('/html/head//script/text()').extract()
        news_brief_info = None
        for script in script_list:
            if script.find('window.DATA = ') >= 0:
                news_brief_info = json.loads(script.lstrip('window.DATA = '))
                break
        item = NewsItem()
        try:
            item['title'] = news_brief_info['title']
            item['category'] = news_brief_info['catalog1']
            item['media'] = news_brief_info['media']
            item['pub_date'] = news_brief_info['pubtime']
            item['tags'] = news_brief_info['tags']
            item['news_id'] = news_brief_info['cms_id']
            item['source'] = self.name.split('_')[0]
            item['news_url'] = current_url
            item['content'] = []
            for one_p in response.xpath('//p[@class="one-p"]'):
                img = one_p.xpath('.//img/@src').extract()
                if len(img) != 0:
                    item['content'] += ['img_' + src for src in img]
                else:
                    item['content'] += ['text_' + text for text in one_p.xpath('./text()').extract()]
            yield item
        except (KeyError, TypeError, ValueError):
            # 如果出现错误，将出现错误的url追加存入error/error_url.txt文件
            new_dir = self.current_dir_path / Path('data/error/')
            new_dir.mkdir(parents=True, exist_ok=True)
            error_f = open(new_dir / Path('error_url.txt'), 'a', encoding='utf-8')
            error_f.write(str(self.total_error) + '_' + current_url + '\n')
            error_f.close()
            self.total_error += 1



class QqNewsInfoSpider(Spider):
    '''
    The spider for qq news info
    '''
    name = 'qq_news_info'
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
                yield Request(dic['url'], callback=self.parse_item)

    def parse_item(self, response):
        '''
        get the news detail from the news page
        '''
        # 从新闻页爬取信息，存入data/qq/news_info/文件夹
        current_url = response.request.url
        script_list = response.xpath('/html/head//script/text()').extract()
        news_brief_info = None
        for script in script_list:
            if script.find('window.DATA = ') >= 0:
                news_brief_info = json.loads(script.lstrip('window.DATA = '))
                break
        item = NewsItem()
        try:
            item['title'] = news_brief_info['title']
            item['category'] = news_brief_info['catalog1']
            item['media'] = news_brief_info['media']
            item['pub_date'] = news_brief_info['pubtime']
            item['tags'] = news_brief_info['tags']
            item['news_id'] = news_brief_info['cms_id']
            item['source'] = self.name.split('_')[0]
            item['news_url'] = current_url
            item['content'] = []
            for one_p in response.xpath('//p[@class="one-p"]'):
                img = one_p.xpath('.//img/@src').extract()
                if len(img) != 0:
                    item['content'] += ['img_' + src for src in img]
                else:
                    item['content'] += ['text_' + text for text in one_p.xpath('./text()').extract()]
            yield item
        except (KeyError, ValueError, TypeError):
            # 如果出现错误，将出现错误的url追加存入error/error_url.txt文件
            new_dir = self.current_dir_path / Path('data/error/')
            new_dir.mkdir(parents=True, exist_ok=True)
            error_f = open(new_dir / Path('error_url.txt'), 'a', encoding='utf-8')
            error_f.write(str(self.total_error) + '_' + current_url + '\n')
            error_f.close()
            self.total_error += 1
