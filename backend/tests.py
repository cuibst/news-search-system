'''
Test suite for backend
'''
# pylint: disable=line-too-long
# pylint: disable=unused-import
import json
import requests
from django.test import TestCase
from backend.models import User, News

# Create your tests here.
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
        news = News(source='1', news_url='2', category='3',\
                    media='7', tags='6', title='5', news_id='4',\
                    pub_date='8', content='9', summary='10')
        news.save()
        response = self.client.post('/api/uploadnews/', data={
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
        }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['info'], 'repetitive news')

        response = self.client.post('/api/uploadnews/', data={
            "source": "1",
            "news_url": "d",
            "category": "a",
            "media": "11",
            "tags": "12",
            "title": "112",
            "news_id": "45",
            "pub_date": "255",
            "content": "2333",
            "summary": "908",
            "img": "98009",
            "test": True
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'preserve successfully')
        # dic1 = {'id': "45"}
        # dic2 = {'id': "4"}
        # requests.post("https://news-search-lucene-rzotgorz.app.secoder.net/index/delete", data=json.dumps(dic1),
        #               header={'Content-Type': 'application/json'})
        # requests.post("https://news-search-lucene-rzotgorz.app.secoder.net/index/delete", data=json.dumps(dic2),
        #               header={'Content-Type': 'application/json'})
