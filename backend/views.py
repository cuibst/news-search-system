# pylint: disable=too-many-branches
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
import requests
from django.core import signing
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from .models import User, News

# Create your views here.
HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = "rzotgorz"
SALT = 'www.lanou3g.com'
TIME_OUT = 60*60*2


def encrypt(obj):
    '''
    encrypt the user
    '''
    value = signing.dumps(obj, key=KEY, salt=SALT)
    value = signing.b64_encode(value.encode()).decode()
    return value


def decrypt(src):
    '''
    decrypt the token
    '''
    src = signing.b64_decode(src.encode()).decode()
    raw = signing.loads(src, key=KEY, salt=SALT)
    print(type(raw))
    return raw


def create_token(username):
    '''
    generate token information
    '''

    header = encrypt(HEADER)

    payload = {'username': username, 'iat': time.time()}
    payload = encrypt(payload)

    md5 = hashlib.md5()

    md5.update(("%s.%s" % (header, payload)).encode())
    signature = md5.hexdigest()

    token = "%s.%s.%s" % (header, payload, signature)
    return token


def get_payload(token):
    '''
    get the token of payload
    '''
    payload = str(token).split('.')[1]
    payload = decrypt(payload)
    return payload


def get_username(token):
    '''
    get the token of username
    '''
    payload = get_payload(token)
    return payload['username']

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
            flag = False
            with open('./backend/token.json', 'r', encoding='utf-8') as f:
                tmp_dict = json.load(f)
                for key, value in tmp_dict.items():
                    if user.id == value:
                        flag = True
                        break
            if flag is False:
                tmp_dict[token] = user.id
            f.close()
            print(tmp_dict)
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
    total_news = len(news_list)
    total_success = 0
    total_repetitive = 0
    total_error = 0
    error_list = []
    key_list = ['news_id', 'news_url', 'title', 'source', 'category', 'media',
                'tags', 'pub_date', 'summary', 'img', 'content']
    news_id_dict = {'news_id': []}
    for data in news_list:
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
        news = News.objects.filter(news_id=data['news_id']).first()
        if not news:
            news_id_dict['news_id'].append(data['news_id'])
            news = News(source=data['source'], news_url=data['news_url'], category=data['category'],
                        media=data['media'], tags=data['tags'], title=data['title'],
                        news_id=data['news_id'], img=data['img'], pub_date=data['pub_date'],
                        content=str(data['content']), summary=data['summary'])
            news.full_clean()
            news.save()
            total_success += 1
        else:
            total_repetitive += 1
    lucene_url = "https://news-search-lucene-rzotgorz.app.secoder.net/index/add"
    requests.post(url=lucene_url, json=news_id_dict,
                  headers={'Content-Type': 'application/json'})
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
                if key == token:
                    user_id = value
        if user_id == -1:
            return JsonResponse({
                'code': 403,
                'info': "invalid token"
            }, status=200)
        print(899)
        user = User.objects.filter(id=user_id).first()
        data = json.loads(request.body)

        if data['odpasswd'] != user.password:
            return JsonResponse({
                'code': 402
            }, status=200)
        user.email = data['email']
        user.phone_number = data['phonenumber']
        if data['password'] != '':
            user.password = data['password']
        if user.name == data['username']:
            pass
        else:
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
            if key == token:
                user_id = value
                break
    if user_id == -1:
        return JsonResponse({
            'code': 403,
            'info': 'invalid token'
        }, status=200)
    user = User.objects.filter(id=user_id).first()
    return JsonResponse({
        'username': user.name,
        'phonenumber': user.phone_number,
        'email': user.email
    })
