# pylint: disable=too-many-statements
# pylint: disable=too-many-locals
# pylint: disable=no-value-for-parameter
# pylint: disable=invalid-name
# pylint: disable=unused-variable
# pylint: disable=redefined-outer-name
# pylint: disable=inconsistent-return-statements
# pylint: disable=too-many-branches
# pylint: disable=consider-using-enumerate
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
from bs4 import BeautifulSoup
from .models import User, News, Behavior, Record, Search


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
                tmp_dict[str(user.id)] = [token, time.time()]
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
    tmp_news = News.objects.all()[0]
    print('### Exist news_id:', tmp_news.news_id)
    rep_news_list = News.objects.values('news_id').filter(news_id__in=origin_news_id_list)
    print("### origin_news_id_list", origin_news_id_list)
    rep_news_id_list = [news['news_id'] for news in rep_news_list]
    total_repetitive = len(rep_news_id_list)
    print("###", rep_news_id_list)
    for data in news_list:
        if data['news_id'] in rep_news_id_list:
            print("###", data['news_id'])
            continue
        rep_news_id_list.append(data['news_id'])
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
        else:
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
    id_set = set()
    title_set = set()
    for news in News.objects.order_by('-pk').filter(Q(img__startswith='https') & cat_query)[:15]:
        if len(imgnews_list) >= 5:
            break
        data = news_to_dict(news)
        if data['title'] not in title_set and data['news_id'] not in id_set:
            imgnews_list.append(data)
            title_set.add(data['title'])
            id_set.add(data['news_id'])
    id_set = set()
    title_set = set()
    for news in News.objects.order_by('-pk').filter(cat_query)[:50]:
        if len(textnews_list) >= 20:
            break
        data = news_to_dict(news)
        if data not in imgnews_list and data['title'] not in title_set \
            and data['news_id'] not in id_set:
            textnews_list.append(data)
            id_set.add(data['news_id'])
            title_set.add(data['title'])
        else:
            continue
    likeword = ''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    break
                user_id = int(key)
                break
    if user_id != -1:
        user1 = User.objects.filter(id=user_id).first()
        tmp_dict1 = {}
        tmp_list = []
        for item in user1.user_behavior.all():
            if item.content in tmp_dict1:
                tmp_dict1[item.content] += 1
            else:
                tmp_dict1[item.content] = 1
                tmp_list.append(item.content)

        tmp_list.sort(key=lambda elem: tmp_dict1[elem])
        tmp_list.reverse()
        print(tmp_list)
        final_list = []
        if len(tmp_list) < 5:
            final_list = tmp_list
        else:
            for i in range(0, 5):
                final_list.append(tmp_list[i])
        for i in range(0, len(final_list)):
            likeword += final_list[i]
            likeword += ' '
    response_data = {
        'data': {
            'imgnews': imgnews_list,
            'textnews': textnews_list,
            'likeword': likeword
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
                            'code': 401,
                            'info': 'overdue token'
                        }, status=401)
                    user_id = int(key)
        if user_id == -1:
            return JsonResponse({
                'code': 401,
                'info': "invalid token"
            }, status=401)
        print("------------------------")
        print(user_id)
        user = User.objects.filter(id=user_id).first()
        data = json.loads(request.body)
        print(user.password)
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
                'code': 200,
                'info': 'name changed'
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
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    user = User.objects.filter(id=user_id).first()
    return JsonResponse({
        'user': {
            'username': user.name,
            'phonenumber': user.phone_number,
            'email': user.email
        }
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
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    user1 = User.objects.filter(id=user_id).first()
    print(user1.id)
    data = json.loads(request.body)
    tmp_list = data['like']
    print(tmp_list)
    for item in tmp_list:
        tmp_behavior = Behavior(user=user1, content=item)
        tmp_behavior.save()
        print(item)
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
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    user1 = User.objects.filter(id=user_id).first()
    tmp_dict1 = {}
    tmp_list = []
    for item in user1.user_behavior.all():
        if item.content in tmp_dict1:
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


@csrf_exempt
def get_record(request):
    '''
        get users' search history
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    print(user_id)
    user3 = User.objects.filter(id=user_id).first()
    length = user3.user_record.count()
    tmp_list = []
    for i in user3.user_record.all():
        tmp_list.append(i.content)
    tmp_list.reverse()
    return JsonResponse({
        'length': length,
        'data': tmp_list
    }, status=200)

@csrf_exempt
def delete_record(request):
    '''
        delete users' search history
    '''
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    print(user_id)
    user = User.objects.filter(id=user_id).first()
    Record.objects.filter(user=user).delete()
    return JsonResponse({
        'code': 200,
        'info': 'Record deleted successfully'
    }, status=200)


@csrf_exempt
def post_record(request):
    '''
        post users' search history
    '''
    print(1)
    token = request.META.get('HTTP_AUTHENTICATION_TOKEN')
    user_id = -1
    with open('./backend/token.json', 'r', encoding='utf-8') as f:
        tmp_dict = json.load(f)
        for key, value in tmp_dict.items():
            if token == value[0]:
                if value[1] + TIME_OUT < time.time():
                    return JsonResponse({
                        'code': 401,
                        'info': 'overdue token'
                    }, status=401)
                user_id = int(key)
                break
    if user_id == -1:
        return JsonResponse({
            'code': 401,
            'info': 'invalid token'
        }, status=401)
    print(user_id)
    user2 = User.objects.filter(id=user_id).first()
    data = json.loads(request.body)
    content = data['content']
    record = Record(user=user2, content=content)
    for item in user2.user_record.all():
        if item.content == content:
            item.delete()
            record.save()
            return JsonResponse({
                'code': 200,
                'info': 'repeat search'
            }, status=200)
    record.save()
    num = user2.user_record.count()
    if num > 10:
        user2.user_record.first().delete()
        return JsonResponse({
            'code': 200,
            'info': 'replace one'
        }, status=200)
    return JsonResponse({
        'code': 200,
        'info': 'save successfully'
    }, status=200)


@csrf_exempt
def get_hotwords(request):
    '''
    crawl hotwords from baidu news
    '''
    baidunews_url = 'https://news.baidu.com/'
    response = requests.get(url=baidunews_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    soup.encode('utf-8')
    hotwords = soup.select('a.hotwords_li_a')
    hotwords_list = []
    for hotword in hotwords:
        hotwords_list.append(hotword.text)
    return_data = {
        'data': hotwords_list
    }
    return JsonResponse(return_data, json_dumps_params={
        'ensure_ascii': False
    }, status=200, charset='utf-8')

@csrf_exempt
def get_search(request):
    '''
        get search result
    '''
    print(1)
    for item in Search.objects.all():
        num = time.time() - float(item.create_time)
        if num > 10 * 24 * 60 * 60:
            item.delete()

    tmp_dict = {}
    tmp_list = []
    for item in Search.objects.all():
        if item.content in tmp_dict:
            tmp_dict[item.content] += 1
        else:
            tmp_dict[item.content] = 1
            tmp_list.append(item.content)
    tmp_list.sort(key=lambda elem: tmp_dict[elem])
    tmp_list.reverse()
    final_list = []
    if len(tmp_list) < 10:
        for item in tmp_list:
            final_list.append(item)
    else:
        for i in range(0, 10):
            final_list.append(tmp_list[i])
    return JsonResponse({
        'list': final_list
    }, status=200)
