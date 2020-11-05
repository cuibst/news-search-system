# pylint: disable=too-many-branches
# pylint: disable=too-many-statements
# pylint: disable=too-many-locals
'''
views for backend
'''
import json
from datetime import datetime
import requests
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from .models import User, News

# Create your views here.

def index(request):
    '''
    render /api
    '''
    mes = dict()
    mes['message'] = "Hello Software Engineering!"
    mes['code'] = 200
    return JsonResponse(mes)

@csrf_exempt
def login(request):
    '''
    login
    '''
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['username']
        password = data['password']
        user = User.objects.filter(name=name).first()
        if not user:
            return JsonResponse({
                'code': 401,
                'data': "invalid user",
                'token': 'WA1'
            }, status=200)
        password0 = user.password
        print(password0, password)
        if password0 == password:
            return JsonResponse({
                'code': 200,
                'data': 'login successfully',
                'Token': 'AC'
            }, status=200)
        return JsonResponse({
            'code': 401,
            'data': 'wrong password',
            'Token': 'WA2'
        }, status=200)
    return JsonResponse({
        'code': 405,
        'data': 'invalid method',
        'Token': 'WA3'
    }, status=405)

@csrf_exempt
def register(request):
    '''
    register
    '''
    data = json.loads(request.body)
    name = data['username']
    password = data['password']
    email = data['email']
    phone_number = data['phonenumber']
    user = User.objects.filter(name=name).first()
    print(user)
    if not user:
        print(1)
        user = User(name=name, password=password, email=email, phone_number=phone_number)
        try:
            user.full_clean()
            user.save()
            print("succeed")
            return JsonResponse({
                'code': 200,
                'data': "register successfully"
            }, status=200)
        except ValidationError:
            return JsonResponse({
                'code': 402,
                'data': 'Validation error'
            }, status=200)
    else:
        return JsonResponse({
            'code': 401,
            'data': 'username used'
        }, status=200)

@csrf_exempt
def upload_news(request):
    '''
        upload news
    '''
    news_list = json.loads(request.body)['data']
    origin_news_id_list = [news['news_id'] for news in news_list]
    total_news = len(news_list)
    total_success = 0
    total_error = 0
    error_list = []
    key_list = ['news_id', 'news_url', 'title', 'source', 'category', 'media',
                'tags', 'pub_date', 'summary', 'img', 'content']
    news_id_dict = {'news_id': []}
    print("### Start to filter valid news:", datetime.now())
    rep_news_list = News.objects.filter(news_id__in=origin_news_id_list)
    total_repetitive = len(rep_news_list)
    for data in news_list:
        if data['news_id'] in rep_news_list:
            continue
        error = False
        for key in key_list:
            if key in data:
                if data[key] == '':
                    data[key] = 'unknown ' + key
            else:
                error = True
                data[key] = 'unknown ' + key
        if error:
            total_error += 1
            error_list.append(data['news_id'])
        news_id_dict['news_id'].append(data['news_id'])
        news = News(source=data['source'], news_url=data['news_url'], category=data['category'],
                    media=data['media'], tags=data['tags'], title=data['title'],
                    news_id=data['news_id'], img=data['img'], pub_date=data['pub_date'],
                    content=str(data['content']), summary=data['summary'])
        news.full_clean()
        news.save()
        total_success += 1
    print("### Valid news found:", datetime.now())
    print("### Start to send request to lucene:", datetime.now())
    lucene_url = "https://news-search-lucene-rzotgorz.app.secoder.net/index/add"
    requests.post(url=lucene_url, json=news_id_dict,
                  headers={'Content-Type': 'application/json'}, timeout=100)
    print("### Lucene response received:", datetime.now())
    print("### Total news:", total_news)
    print("### Total success:", total_success)
    print("### Total repetitive:", total_repetitive)
    print("### Total error:", total_error)
    if total_error >= 0:
        print("### Error list:", error_list)
    return JsonResponse({
        'info': 'Preserve process finished.',
        'code': 200,
        'total_news': total_news,
        'total_success': total_success,
        'total_repetitive': total_repetitive,
        'total_error': total_error,
        'error_list': error_list
    }, status=200)

@csrf_exempt
def get_news(request):
    '''
    Provide an api to return imgnews and textnews for homepage.
    Note that this is an test version!
    '''
    news_list = []
    for news in News.objects.all()[:25]:
        data = {
            'news_id': news.news_id,
            'news_url': news.news_url,
            'title': news.title,
            'source': news.source,
            'category': news.category,
            'media': news.media,
            'tags': news.tags,
            'pub_date': news.pub_date,
            'summary': news.summary,
            'img': news.img,
            'content': news.content
        }
        news_list.append(data)
    response_data = {
        'data': {
            'imgnews': news_list[:5],
            'textnews': news_list[5:]
        }
    }
    return JsonResponse(response_data, json_dumps_params={
        'ensure_ascii': False
    }, status=200, charset='utf-8')
