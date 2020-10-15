# pylint: disable=line-too-long
'''
crawler for xinhuanet.com
'''
import json
import re
from urllib import parse
from pathlib import Path
from scrapy import Spider, Request
from ..items import NewsItem


class XinhuaNewsFullSpider(Spider):
    '''
    XinhuaNewsFullSpider
    '''
    # 此爬虫是新华网全量爬虫
    # 爬取过程分为四步：扫描api接口得到有用的nid，根据nid获得新闻列表，根据新闻列表获得新闻url，根据新闻url爬取出news item
    # 新华网api格式： http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=100
    name = 'xinhua_news_full'
    allowed_domains = ['*']
    current_dir_path = Path(__file__).parent

    # 根据nid的起止号码，遍历这部分nid的api，构建初始爬取队列
    def start_requests(self):
        '''
        start_requests
        :return:
        '''
        nid_start = 11100000
        nid_end = 11200000
        url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
        url_suffix = '&pgnum=1&cnt=100'
        for i in range(nid_start, nid_end):
            full_url = url_prefix + str(i) + url_suffix
            yield Request(url=full_url, callback=self.parse)

    # 根据start_urls，找出含有新闻列表的nid编号
    def parse(self, response, **kwargs):
        '''
        parse_nid
        :param response:
        :param kwargs:
        :return:
        '''
        if len(response.body) > 100:
            # self.f.write(response.request.url[38:38+self.id_len] + '\n')
            yield Request(url=response.request.url, callback=self.parse_news_url, dont_filter=True)
            # 增加url中的pgnum参数，回调自身，检查是否含有新闻列表
            match_obj = re.match(r'http://qc\.wa\.news\.cn/nodeart/list\?nid=(\d+)&pgnum=(\d+)&cnt=100',
                                 response.request.url)
            nid = match_obj.group(1)
            pgnum = int(match_obj.group(2))
            pgnum += 1
            next_url = 'http://qc.wa.news.cn/nodeart/list?nid=' + nid + '&pgnum=' + str(pgnum) + '&cnt=100'
            yield Request(url=next_url, callback=self.parse, dont_filter=True)
        else:
            return

    # 根据可用nid编号，从中爬取出新闻列表，进而筛选出可用的新闻url
    def parse_news_url(self, response):
        '''
        parse_news_url
        :param response:
        :param kwargs:
        :return:
        '''
        news_dic_list = json.loads(response.text[1:-1])['data']['list']
        for news_dic in news_dic_list:
            news_url = news_dic['LinkUrl']
            # 检查news_url是否符合要求
            if re.search(r'xinhuanet\.com', news_url) is None:
                continue
            if re.search(r'french|arabic|portuguese|german|spanish|jp', news_url) is not None:
                continue
            # 以上代码块对news_url进行筛选，可能需要更改
            yield Request(url=news_url, callback=self.parse_news_item, dont_filter=True)

    # 根据可用的新闻页面url，爬取出新闻数据，返回news item
    def parse_news_item(self, response):  # pylint: disable=too-many-locals, no-self-use, too-many-branches, too-many-statements
        '''
        parse_news_item
        :param response:
        :param kwargs:
        :return:
        '''
        # 此部分代码最初版本的parse函数，未优化！
        url = response.request.url
        item = NewsItem()
        id_match_obj = re.search(r'c_([0-9]+)\.htm', url)
        if id_match_obj is None:
            return
        item['news_id'] = 'xinhua_' + id_match_obj.group(1)
        item['source'] = 'xinhua'
        # 从两种新闻页面选择发布日期，一种是h-time，一种是time
        time = ''
        try:
            time = response.xpath("//*[@class='h-time']/text()").extract()[0].strip()
        except IndexError:
            pass
        if time == '':
            try:
                time = response.xpath("//*[@class='time']/text()").extract()[0].strip()
            except IndexError:
                pass
            time_match_obj = re.match(r'20\d{2}年\d{2}月\d{2}日 \d{2}:\d{2}:\d{2}', time)
            if time_match_obj is not None:
                time = re.sub(r'[年月]', '-', time)
                time = re.sub(r'日', '', time)
        if time == '':
            return
        item['pub_date'] = time
        # 定义新闻的标题和来源
        try:
            title_full = response.xpath('//title/text()').extract()[0].strip()
            title_name = title_full.split('-')[0].split('_')[0].strip()
            title_media = ' '.join(title_full.lstrip(title_name).split('-'))
            title_media = ' '.join(title_media.split('_'))
            title_media = ' '.join(title_media.split())
        except IndexError:
            return
        if title_name == '':
            return
        item['title'] = title_name
        item['media'] = title_media
        item['news_url'] = url
        # 定义新闻的分类，如果是地方新闻则定义为'local_{地方缩写}'，否则定义为新闻所在的标签名称
        cat = ''
        local_pattern = r'www\.([a-z]+)\.xinhuanet.com'
        local_match_obj = re.search(local_pattern, url)
        cat_pattern = r'xinhuanet\.com/[/]?([a-z]+)/'
        cat_match_obj = re.search(cat_pattern, url)
        if local_match_obj is not None:
            cat = 'local_' + local_match_obj.group(1)
        elif cat_match_obj is not None:
            cat = cat_match_obj.group(1)
        item['category'] = cat
        # 定义新闻的标签，两种页面格式一样，非必需属性
        tags = ''
        try:
            tags = response.xpath('//meta[@name="keywords"]/@content').extract()[0].strip()
        except IndexError:
            pass
        item['tags'] = tags
        # 定义新闻的summary
        summary = ''
        try:
            summary = response.xpath('//meta[@name="description"]/@content').extract()[0].strip()
            summary = summary.split('---')
            if len(summary) >= 1:
                summary = summary[1]
            else:
                summary = ''
        except IndexError:
            pass
        item['summary'] = summary
        # 定义新闻的video，非必需属性
        video_src = ''
        try:
            video_src = response.xpath('//video/@src').extract()[0]
        except IndexError:
            pass
        item['video'] = video_src
        # 定义新闻的内容content
        p_list = response.xpath('//*[@id="p-detail"]//p')
        if not p_list:
            p_list = response.xpath('//*[@class="article"]//p')
        content = []
        for one_p in p_list:
            img = one_p.xpath('.//img/@src').extract()
            if len(img) == 0:
                content += ['text_' + text.strip() for text in one_p.xpath('./text()').extract() if text.strip() != '']
            else:
                content.append("img_" + parse.urljoin(url, img[0]))
        item['content'] = content
        yield item
