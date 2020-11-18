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
        Test illegal get
        '''
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/favicon.ico')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/123.py')
        self.assertEqual(response.status_code, 404)

    def test_metrics(self):
        '''
        Test /metrics get
        '''
        response = self.client.get('/metrics')
        self.assertEqual(response.status_code, 200)
