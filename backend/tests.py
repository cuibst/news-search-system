'''
Test suite for backend
'''
# pylint: disable=line-too-long
# pylint: disable=unused-import
# pylint: disable=invalid-name
import json
import requests
from django.test import TestCase
from django.test import Client
from backend.models import User, News, Behavior, Record
from backend.views import news_to_dict

# Create your tests here.


def test_news_to_dict():
    '''
    test for function news_to_dict() in views.py
    '''
    news = News(source='test_source', news_url='test_news_url',
                category='test_category', media='test_media', tags='test_tags',
                title='test_title', news_id='test_news_id', pub_date='test_pub_date',
                content='test_content', summary='test_summary', img='test_img')
    data = news_to_dict(news)
    assert data['news_id'] == 'test_news_id'


class TestViews(TestCase):
    '''
    Test cases for views.py
    '''
    def test_index(self):
        '''
        Test /api/ get
        '''
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['message'], "Hello Software Engineering!")

    def test_get(self):
        '''
        Test /api/login/ get
        '''
        response = self.client.get('/api/login/')
        self.assertEqual(response.status_code, 405)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 405)
        self.assertEqual(data['data'], "invalid method")

    def test_post(self):
        '''
        Test /api/login/ post
        '''
        user = User(name='1', password='123')
        user.save()
        response = self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        # a = Client()
        # response = a.post('/api/login/', data={
        #     'username': '1',
        #     'password': '12'
        # }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['data'], 'wrong password')

        response = self.client.post('/api/login/', data={
            'username': '12',
            'password': '12'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['data'], 'invalid user')

        response = self.client.post('/api/login/', data={
            'username': '1',
            'password': '123'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['data'], 'login successfully')

    def test_register(self):
        '''
        Test /api/register
        '''
        user = User(name='m', password='123', email='213423423@qq.com', phone_number='12584525566')
        user.save()
        response = self.client.post('/api/register/', data={
            'username': 'm',
            'password': '123',
            'email': '213423423@qq.com',
            'phonenumber': '12584525566'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['data'], 'username used')
        self.assertEqual(data['code'], 401)

        response = self.client.post('/api/register/', data={
            'username': 'abc',
            'password': '123',
            'email': '213423423@qq.com',
            'phonenumber': '1258452354415641563156486488641651484855566'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 402)
        self.assertEqual(data['data'], 'Validation error')
        response = self.client.post('/api/register/', data={
            'username': 'abcdefg',
            'password': '123',
            'email': '213423423@qq.com',
            'phonenumber': '12584523525'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['data'], 'register successfully')

    def test_upload_news(self):
        '''
            Test /api/uploadnews/
        '''
        news = News(source='1', news_url='2', category='3',
                    media='7', tags='6', title='5', news_id='4',
                    pub_date='8', content='9', summary='10', img='11')
        news.save()
        response = self.client.post('/api/uploadnews/', data={
            'data': [
                {
                    "source": "1",
                    "news_url": "d",
                    "category": "a",
                    "media": "11",
                    "tags": "12",
                    "title": "112",
                    "news_id": "4",
                    "pub_date": "255",
                    "content": "2333",
                    "summary": "9080",
                    "img": "9878",
                    "test": True
                }
            ]
        }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'Preserve process finished.')
        self.assertEqual(data['total_repetitive'], 1)
        news.delete()

    def test_user(self):
        '''
            test user
        '''
        user = User(name='1', password='123')
        user.save()
        response = self.client.post('/api/login/', data={
            'username': '1',
            'password': '123'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        response = a.get('/api/user/')
        data = json.loads(response.content)
        self.assertEqual(data['user']['username'], '1')
        self.assertEqual(response.status_code, 200)
        token1 = token + '1'
        b = Client(HTTP_AUTHENTICATION_TOKEN=token1)
        response = b.get('/api/user/')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['info'], 'invalid token')

    def test_user_change(self):
        '''
        test user_change
        '''
        user = User(name='1', password='12', email='12', phone_number='123')
        user.save()
        response = self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        response = a.post('/api/userchange/', data={
            'oldpasswd': '123'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 402)
        response = a.post('/api/userchange/', data={
            'oldpasswd': '12',
            'email': '1@2',
            'phonenumber': '123456',
            'username': '1',
            'password': '12345'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        response = a.post('/api/userchange/', data={
            'oldpasswd': '12345',
            'email': '1@2',
            'phonenumber': '123456',
            'username': '123',
            'password': '12345'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'name changed')
        user1 = User(name='@')
        user1.save()
        response = a.post('/api/userchange/', data={
            'oldpasswd': '12345',
            'email': '1@2',
            'phonenumber': '123456',
            'username': '@',
            'password': '12345'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)

    def test_views(self):
        '''
            test views
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        response = a.post('/api/views/', data={
            'like': ['1', '2', '3', '4', '5']
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        token1 = token + '1'
        b = Client(HTTP_AUTHENTICATION_TOKEN=token1)
        response = b.post('/api/views/', data={
            'like': ['1', '2', '3', '4', '5']
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['info'], 'invalid token')

    def test_get_behavior(self):
        '''
            test get_behavior
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        a.post('/api/views/', data={
            'like': ['1', '2', '3', '4']
        }, content_type='application/json')
        response = a.post('/api/getbehavior/', data={
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['length'], 4)
        a.post('/api/views/', data={
            'like': ['1', '2', '3', '4', '5']
        }, content_type='application/json')
        response = a.post('/api/getbehavior/', data={
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['length'], 5)

    def test_get_news(self):
        '''
        test for getnews() in views.py
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        tmp_behavior = Behavior(user=user, content='1')
        tmp_behavior.save()
        tmp_behavior2 = Behavior(user=user, content='2')
        tmp_behavior2.save()
        tmp_behavior3 = Behavior(user=user, content='2')
        tmp_behavior3.save()
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        response = a.get('/api/getnews/')
        data = json.loads(response.content)
        assert 'imgnews' in data['data']
        assert 'textnews' in data['data']


    def test_post_record(self):
        '''
            test post_record
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        response = a.post('/api/postrecord/', data={
            'content': '0'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'save successfully')
        response = a.post('/api/postrecord/', data={
            'content': '0'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'repeat search')
        for i in range(1, 10):
            a.post('/api/postrecord/', data={
                'content': str(i)
            }, content_type='application/json')
        response = a.post('/api/postrecord/', data={
            'content': 'a'
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'replace one')

    def test_get_record(self):
        '''
            test get_record
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        for i in range(1, 12):
            a.post('/api/postrecord/', data={
                'content': str(i)
            }, content_type='application/json')
        response = a.get('/api/getrecord/')
        data = json.loads(response.content)
        test_list = ['11', '10', '9', '8', '7', '6', '5', '4', '3', '2']
        self.assertEqual(data['length'], 10)
        self.assertEqual(data['data'], test_list)

    def test_get_hotwords(self):
        '''
        test for get_hotwords() function in views.py
        '''
        response = self.client.get('/api/gethotwords/')
        data = json.loads(response.content)
        assert 'data' in data

    def test_get_search(self):
        '''
            test get_search
        '''
        user = User(name='1', password='12')
        user.save()
        self.client.post('/api/login/', data={
            'username': '1',
            'password': '12'
        }, content_type='application/json')
        with open('./backend/token.json', 'r', encoding='utf-8') as f:
            tmp_dict = json.load(f)
        k = str(user.id)
        token = tmp_dict[k][0]
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        a.post('/api/views/', data={
            'like': ['1', '2', '3', '4', '5']
        }, content_type='application/json')
        a.post('/api/views/', data={
            'like': ['1', '2', '3', '4', '5']
        }, content_type='application/json')
        response = a.get('/api/getsearch/')
        data = json.loads(response.content)
        print(data['list'])
        self.assertEqual(response.status_code, 200)
