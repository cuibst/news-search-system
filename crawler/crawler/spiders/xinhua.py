from scrapy import Spider, Request
import json
import re
from crawler.crawler.items import NewsItem
from urllib import parse
from pathlib import Path


class XinhuaNewsNodeSpider(Spider):
    # 此爬虫遍历nodeid，寻找有新闻列表的api界面
    # http://qc.wa.news.cn/nodeart/list?nid=111444&pgnum=1&cnt=10
    name = 'xinhua_news_node'
    allowed_domains = ['qc.wa.news.cn']
    current_dir_path = Path(__file__).parent
    # 在此处指定搜索起点和终点的id号
    # 注意！此处为了提高性能使用的是硬编码，务必确保起点和终点的数字长度相等
    # 以后需要改成正则表达式！
    start = 110000
    end = 120000
    id_len = len(str(start))
    start_urls = ['http://qc.wa.news.cn/nodeart/list?nid=' + str(i) + '&pgnum=1&cnt=10' for i in range(start, end)]
    url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
    url_suffix = '&pgnum=1&cnt=10'
    new_dir = current_dir_path / Path('data/xinhua/debug/')
    new_dir.mkdir(parents=True, exist_ok=True)
    f = open(new_dir / Path('valid_node_' + str(start) + '_' + str(end) + '.txt'), 'a', encoding='utf-8')

    def parse(self, response, **kwargs):
        if(len(response.body) > 100):
            self.f.write(response.request.url[38:38+self.id_len] + '\n')
            return response.request.url
        return None


class XinhuaNewsUrlSpider(Spider):
    # 此爬虫打开节点api文件，爬取api提供的新闻列表，进而爬取相应的新闻页面
    name = 'xinhua_news_url'
    allowed_domains = ['*']
    current_dir_path = Path(__file__).parent
    url_prefix = 'http://qc.wa.news.cn/nodeart/list?nid='
    url_suffix = '&pgnum=1&cnt=100'
    # 测试版本，此处使用的nid文件需要手动指定
    new_dir = current_dir_path / Path('data/xinhua/debug/')
    new_dir.mkdir(parents=True, exist_ok=True)
    try:
        f = open(new_dir / Path('valid_node_11100000_11200000.txt'), 'r', encoding='utf-8')
    except:
        path = new_dir / Path('valid_node_11100000_11200000.txt')
        f = open(path, 'w', encoding='utf-8')
        f.close()
        f = open(path, 'r', encoding='utf-8')
    nid_list = f.read().split('\n')
    f.close()
    f = open(new_dir / Path('news_url_11100000_11200000.txt'), 'a', encoding='utf-8')
    start_urls = ['http://qc.wa.news.cn/nodeart/list?nid=' + nid +
                  '&pgnum=1&cnt=100' for nid in nid_list]

    def parse(self, response, **kwargs):
        if(len(response.text) < 100):
            return
        news_list = []
        try:
            news_list = json.loads(response.text[1:-1])['data']['list']
        except:
            return
        for sub_dic in news_list:
            if(sub_dic['LinkUrl'] != ''):
                self.f.write(sub_dic['LinkUrl'] + '\n')
        if(len(news_list) >= 100):
            pattern = r'http://qc\.wa\.news\.cn/nodeart/list\?nid=[0-9]+&pgnum=([0-9]+)&cnt=100'
            match_obj = re.match(pattern, response.request.url)
            if(match_obj):
                pgnum = int(match_obj.group(1))
                pgnum += 1
                prefix_match_obj = re.match(r'(http://qc\.wa\.news\.cn/nodeart/list\?nid=[0-9]+)&pgnum=[0-9]+&cnt=100', response.request.url)
                yield Request(prefix_match_obj.group(1) + '&pgnum=' + str(pgnum) + '&cnt=100', callback=self.parse, dont_filter=True)

class XinhuaNewsInfoSpider(Spider):
    # 此爬虫根据爬取到的news url文件进行全量新闻爬取
    name = "xinhua_news_info"
    # 之后可以加上jjckb
    allowed_domains = ['www.xinhuanet.com', 'news.xinhuanet.com', ]
    current_dir_path = Path(__file__).parent
    new_dir = current_dir_path / Path('data/xinhua/debug/')
    new_dir.mkdir(parents=True, exist_ok=True)
    try:
        f = open(new_dir / Path('news_url_11100000_11200000.txt'), 'r', encoding='utf-8')
    except:
        f = open(new_dir / Path('news_url_11100000_11200000.txt'), 'w', encoding='utf-8')
        f.close()
        f = open(new_dir / Path('news_url_11100000_11200000.txt'), 'r', encoding='utf-8')

    def start_requests(self):
        # 循环读入news url，交给调度器爬取
        while True:
            url = self.f.readline()
            if(url == ''):
                break
            # 过滤掉不需要的url
            if(re.search(r'xinhuanet\.com', url) == None):
                continue
            if(re.search(r'french|arabic|portuguese|german|spanish|jp', url) != None):
                continue
            yield Request(url, callback=self.parse)


    def parse(self, response, **kwargs):
        url = response.request.url
        item = NewsItem()
        id_pattern = r'c_([0-9]+)\.htm'
        id_match_obj = re.search(id_pattern, url)
        if(id_match_obj == None):
            return
        item['news_id'] = 'xinhua_' + id_match_obj.group(1)
        item['source'] = 'xinhua'
        # 从两种新闻页面选择发布日期，一种是h-time，一种是time
        time = ''
        try:
            time = response.xpath("//*[@class='h-time']/text()").extract()[0].strip()
        except:
            pass
        if (time == ''):
            try:
                time = response.xpath("//*[@class='time']/text()").extract()[0].strip()
            except:
                pass
            time_match_obj = re.match(r'20\d{2}年\d{2}月\d{2}日 \d{2}:\d{2}:\d{2}', time)
            if (time_match_obj != None):
                time = re.sub(r'[年月]', '-', time)
                time = re.sub(r'日', '', time)
        if (time == ''):
            return
        item['pub_date'] = time
        # 定义新闻的标题和来源
        try:
            title_full = response.xpath('//title/text()').extract()[0].strip()
            title_name = title_full.split('-')[0].split('_')[0].strip()
            title_media = ' '.join(title_full.lstrip(title_name).split('-'))
            title_media = ' '.join(title_media.split('_'))
            title_media = ' '.join(title_media.split())
        except:
            return
        if(title_name == ''):
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
        if(local_match_obj != None):
            cat = 'local_' + local_match_obj.group(1)
        elif(cat_match_obj != None):
            cat = cat_match_obj.group(1)
        if(cat != ''):
            item['category'] = cat
        # 定义新闻的标签，两种页面格式一样，非必需属性
        tags = ''
        try:
            tags = response.xpath('//meta[@name="keywords"]/@content').extract()[0].strip()
        except:
            pass
        if(tags != ''):
            item['tags'] = tags
        # 定义新闻的video，非必需属性
        video_src = ''
        try:
            video_src = response.xpath('//video/@src').extract()[0]
        except:
            pass
        if(video_src != ''):
            item['video'] = video_src
        # 定义新闻的内容content
        p_list = []
        try:
            p_list = response.xpath('//*[@id="p-detail"]//p')
        except:
            pass
        if(not p_list):
            try:
                p_list = response.xpath('//*[@class="article"]//p')
            except:
                pass
        content = []
        for one_p in p_list:
            img = one_p.xpath('.//img/@src').extract()
            if(len(img) == 0):
                content += ['text_' + text.strip() for text in one_p.xpath('./text()').extract() if text.strip() != '']
            else:
                content.append("img_" + parse.urljoin(url, img[0]))
        item['content'] = content
        yield item




