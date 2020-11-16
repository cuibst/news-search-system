# pylint: disable=too-many-statements
# pylint: disable=too-many-locals
# pylint: disable=no-value-for-parameter
# pylint: disable=invalid-name
# pylint: disable=unused-variable
# pylint: disable=redefined-outer-name
# pylint: disable=inconsistent-return-statements
'''
views for backend
'''
import json
import time
import hashlib
from datetime import datetime
import requests
from django.core import signing
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from .models import User, News, Behavior

# Create your views here.
HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = "myy"
SALT = 'www.lanou3g.com'
TIME_OUT = 60*30


def create_token(userid):
    '''
    generate token information
    '''
    header = signing.dumps(HEADER, key=KEY, salt=SALT)
    header = signing.b64_encode(header.encode()).decode()
    payload = {'userid': userid, 'iat': time.time()}
    payload = signing.dumps(payload, key=KEY, salt=SALT)
    payload = signing.b64_encode(payload.encode()).decode()
    md5 = hashlib.md5()
    md5.update(("%s.%s" % (header, payload)).encode())
    signature = md5.hexdigest()
    token = "%s.%s.%s" % (header, payload, signature)
    return token


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

        if password0 == password:
            token = create_token(user.id)
            with open('./backend/token.json', 'r', encoding='utf-8') as f:
                tmp_dict = json.load(f)
                print(tmp_dict)
                print("________________________________________________________")
                tmp_dict[str(user.id)] = (token, time.time())
                print(tmp_dict)
                f.close()
            with open('./backend/token.json', 'w') as f:
                data = json.dumps(tmp_dict, ensure_ascii=False)
                f.write(data)
                f.close()
            return JsonResponse({
                'code': 200,
                'data': 'login successfully',
                'Token': token
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
                'tags', 'pub_date', 'summary', 'img']
    news_id_dict = {'news_id': []}
    print("### Start to filter valid news:", datetime.now())
    rep_news_list = News.objects.values('news_id').filter(news_id__in=origin_news_id_list)
    rep_news_id_list = [news['news_id'] for news in rep_news_list]
    total_repetitive = len(rep_news_id_list)
    for data in news_list:
        if data['news_id'] in rep_news_id_list:
            continue
        content = 'unknown content'
        if data['content']:
            content = ''.join(data['content'])
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
                    content=str(content), summary=data['summary'])
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

def news_to_dict(news):
    '''
    convert news to dict
    '''
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
    return data

@csrf_exempt
def get_news(request):
    '''
    Provide an api to return imgnews and textnews for homepage.
    Note that this is an test version!
    '''
    imgnews_list = []
    textnews_list = []
    typenum_to_category = {
        '0': 'all',
        '1': 'politics',
        '2': 'finance',
        '3': 'tech',
        '4': 'military',
        '5': 'social',
        '6': 'edu',
        '7': 'sports',
        '8': 'ent',
        '9': 'life',
        '10': 'house'
    }
    typenum = request.GET.get('type', default='0')
    if typenum not in typenum_to_category:
        typenum = '0'
    category = typenum_to_category[typenum]
    cat_query = Q()
    if category != 'all':
        cat_query = Q(category=category)
    for news in News.objects.order_by('-pk').filter(Q(img__startswith='https') & cat_query)[:5]:
        data = news_to_dict(news)
        imgnews_list.append(data)
    for news in News.objects.order_by('-pk').filter(cat_query)[:20]:
        data = news_to_dict(news)
        textnews_list.append(data)
    response_data = {
        'data': {
            'imgnews': imgnews_list,
            'textnews': textnews_list
        }
    }
    return JsonResponse(response_data, json_dumps_params={
        'ensure_ascii': False
    }, status=200, charset='utf-8')


@csrf_exempt
def user_change(request):
    '''
    change the information of user
    '''
    if request.method == "POST":
        token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
        user_id = -1
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
            for key, value in tmp_dict.items():
                if token == value[0]:
                    if value[1]+TIME_OUT < time.time():
                        return JsonResponse({
                            'code': 403,
                            'info': 'overdue token'
                        }, status=200)
                    user_id = int(key)
        if user_id == -1:
            return JsonResponse({
                'code': 403,
                'info': "invalid token"
            }, status=200)
        print("------------------------")
        print(user_id)
        user = User.objects.filter(id=user_id).first()
        data = json.loads(request.body)
        if data['oldpasswd'] != user.password:
            return JsonResponse({
                'code': 402
            }, status=200)
        user.email = data['email']
        user.phone_number = data['phonenumber']
        print(user.name)
        if data['password'] != '':
            user.password = data['password']
        if user.name == data['username']:
            user.save()
            return JsonResponse({
                'code': 200
            }, status=200)
        tmp_user = User.objects.filter(name=data['username'])
        if not tmp_user:
            user.name = data['username']
            user.save()
            return JsonResponse({
                'code': 200
            }, status=200)
        return JsonResponse({
            'code': 401
        }, status=200)


@csrf_exempt
def user(request):
    '''
    get the infomation of user
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 403,
                        'info': 'overdue token'
                    }, status=200)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 403,
            'info': 'invalid token'
        }, status=200)
    user = User.objects.filter(id=user_id).first()
    return JsonResponse({
        'user': {
            'username': user.name,
            'phonenumber': user.phone_number,
            'email': user.email
        }
    }, status=200)


@csrf_exempt
def add_behavior(request):
    '''
        add behavior to user
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 403,
                        'info': 'overdue token'
                    }, status=200)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 403,
            'info': 'invalid token'
        }, status=200)
    user = User.objects.filter(id=user_id).first()
    data = json.loads(request.body)
    content = data['content']
    tmp_behavior = Behavior(user=user, content=content)
    tmp_behavior.save()
    return JsonResponse({
        'code': 200,
        'info': 'save successfully'
    }, status=200)


@csrf_exempt
def views(request):
    '''
        record what the user like
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 403,
                        'info': 'overdue token'
                    }, status=200)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 403,
            'info': 'invalid token'
        }, status=200)

    user1 = User.objects.filter(id=user_id).first()
    print(user1.id)
    data = json.loads(request.body)
    tmp_list = data['like']
    for item in tmp_list:
        print(item)
        tmp_behavior = Behavior(user=user1, content=item)
        tmp_behavior.save()
    return JsonResponse({
        'code': 200
    }, status=200)


@csrf_exempt
def get_behavior(request):
    '''
        get what the user may like
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 403,
                        'info': 'overdue token'
                    }, status=200)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 403,
            'info': 'invalid token'
        }, status=200)
    user1 = User.objects.filter(id=user_id).first()
    tmp_dict1 = {}
    tmp_list = []
    for item in user1.user_behavior.all():
        if item in tmp_dict1:
            tmp_dict1[item.content] += 1
        else:
            tmp_dict1[item.content] = 1
            tmp_list.append(item.content)
    print(tmp_dict1)
    tmp_list.sort(key=lambda elem: tmp_dict1[elem])

    if len(tmp_list) < 5:
        return JsonResponse({
            'list': tmp_list,
            'length': len(tmp_list)
        }, status=200)
    final_list = []
    print(final_list)
    for i in range(0, 5):
        final_list.append(tmp_list[i])
    return JsonResponse({
        'list': final_list,
        'length': 5
    }, status=200)
