'''
views for backend
'''
import json
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
    data = json.loads(request.body)
    source = data['source']
    news_url = data['news_url']
    category = data['category']
    media = data['media']
    tags = data['tags']
    title = data['title']
    news_id = data['news_id']
    pub_date = data['pub_date']
    content = data['content']
    video = data['video']
    summary = data['summary']
    news = News.objects.filter(news_id=news_id).first()
    print(12)
    if not news:
        news = News(source=source, news_url=news_url, category=category,\
                    media=media, tags=tags, title=title, news_id=news_id,\
                    pub_date=pub_date, content=content, video=video, summary=summary)
        news.full_clean()
        news.save()
        return JsonResponse({
            'info': 'preserve successfully',
            'code': 200
        }, status=200)
    return JsonResponse({
        'info': 'repetitive news',
        'code': 401
    }, status=200)
