from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import FarmLog

User = get_user_model()

class FarmLogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logs_url = reverse('farmlog-list-create')
        self.logs_view_url = reverse('farmlog-list-view')
        self.user_data = {
            'userID': 'testuser',
            'name': 'Test User',
            'password': 'testpassword123'
        }
        self.user = User.objects.create_user(**self.user_data)
        response = self.client.post(self.login_url, {
            'userID': 'testuser',
            'password': 'testpassword123'
        }, format='json')
        self.access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.farmlog_data = {
            'date': '2024-07-21',
            'lunar_date': '2024-07-15',
            'max_temp': 30.5,
            'min_temp': 20.1,
            'weather': 'Sunny',
            'content': 'Farm work today included planting new seeds.',
            'user': self.user.id,
        }
        self.client.post(self.logs_url, self.farmlog_data, format='json')

    def test_create_log(self):
        response = self.client.post(self.logs_url, self.farmlog_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_view_logs(self):
        response = self.client.get(self.logs_view_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['content'], self.farmlog_data['content'])