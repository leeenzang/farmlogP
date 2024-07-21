from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class FarmLogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logs_url = reverse('farmlog-list-create')
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

    def test_create_log(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.post(self.logs_url, {
            'date': '2024-07-21',
            'lunar_date': '2024-07-15',
            'max_temp': 30.5,
            'min_temp': 20.1,
            'weather': 'Sunny',
            'content': 'Farm work today included planting new seeds.'
        }, format='json')
        print("Response status code:", response.status_code)
        print("Response data:", response.data)  # 디버깅을 위해 응답 데이터를 출력합니다.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)