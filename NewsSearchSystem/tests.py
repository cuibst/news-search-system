'''
Test suite for backend frontend connection
'''
from django.test import TestCase

# Create your tests here.
class TestViews(TestCase):
    '''
    Test cases for views.py
    '''
    def test_connection(self):
        '''
        Test / get
        Test /favicon.ico get
        '''
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
