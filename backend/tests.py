'''
Test suite for backend
'''
import json
from django.test import TestCase
from backend.models import User

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
