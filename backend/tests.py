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
        news_rep = News(source='source_rep', news_url='news_url_rep', category='category_rep',
                        media='media_rep', tags='tags_rep', title='title_rep', news_id='news_id_rep',
                        pub_date='pub_date_rep', content=['content1_rep', 'content2_rep'],
                        summary='summary_rep', img='img_rep')
        news_rep.save()
        post_news_error = {
            "source": "source_test",
            "news_url": "news_url_test",
            "category": "category_test",
            "media": "media_test",
            "tags": "tags_test",
            "title": "title_test",
            "pub_date": "pub_date_test",
            "content": "content_test",
            "summary": "summary_test",
        }
        post_news_rep = post_news_error.copy()
        post_news_rep['news_id'] = 'news_id_rep'
        post_news_rep['img'] = 'img_test'
        post_news_suc = post_news_error.copy()
        post_news_suc['news_id'] = 'news_id_suc'
        post_news_suc['img'] = 'img_test'
        post_news_error['news_id'] = 'news_id_error'
        response = self.client.post('/api/uploadnews/', data={
            'data': [post_news_suc, post_news_rep, post_news_error]
        }, content_type='application/json')
        data = json.loads(response.content)
        self.assertEqual(data['total_repetitive'], 1)
        self.assertEqual(data['total_success'], 1)
        self.assertEqual(data['total_error'], 1)
        news_rep.delete()

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
        # add test news
        for i in range(50):
            news = News(source='source_test', news_url='news_url_test',
                        category='politics', media='media_test', tags='tags_test',
                        title='title_test', news_id='news_id_test_' + str(i),
                        pub_date='pub_date_test', content=['content1_test', 'content2_test'],
                        summary='summary_test',
                        img='https://inews.gtimg.com/newsapp_bt/0/12785958623/1000')
            news.save()
        # add test user
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
        content_list = ['1', '2', '2']
        for i in range(3):
            tmp_behavior = Behavior(user=user, content=content_list[i])
            tmp_behavior.save()
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        url_list = ['/api/getnews/', '/api/getnews/?type=1', '/api/getnews/?type=20']
        for url in url_list:
            response = a.get(url)
            data = json.loads(response.content)
            assert len(data['data']['imgnews']) > 0
            assert len(data['data']['textnews']) > 0
        for news in News.objects.all():
            news.delete()



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

    def test_delete_record(self):
        '''
            test delete record
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
        a = Client(HTTP_AUTHENTICATION_TOKEN='123456')
        response = a.delete('/api/deleterecord/')
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 401)
        self.assertEqual(data['info'], 'invalid token')
        a = Client(HTTP_AUTHENTICATION_TOKEN=token)
        for i in range(1, 12):
            a.post('/api/postrecord/', data={
                'content': str(i)
            }, content_type='application/json')
        response = a.delete('/api/deleterecord/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['info'], 'Record deleted successfully')
        response = a.get('/api/getrecord/')
        data = json.loads(response.content)
        self.assertEqual(data['length'], 0)

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
