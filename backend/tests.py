'''
Test suite for backend
'''
import json
from django.test import TestCase

# Create your tests here.
class TestViews(TestCase):
    '''
    Test cases for views.py
    '''
    def test_index(self):
        '''
        Test /api get
        '''
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['message'], "Hello Software Engineering!")
