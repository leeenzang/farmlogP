from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.user_data = {
            'userID': 'testuser',
            'name': 'Test User',
            'password': 'testpassword123'
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_register_user(self):
        response = self.client.post(self.register_url, {
            'userID': 'newuser',
            'name': 'New User',
            'password': 'newpassword123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        response = self.client.post(self.login_url, {
            'userID': 'testuser',
            'password': 'testpassword123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.access_token = response.data['access']
        self.refresh_token = response.data['refresh']

    def test_logout_user(self):
        self.test_login_user()  # Login first to get tokens
        print(f"Access Token: {self.access_token}")  # 디버깅을 위해 출력
        print(f"Refresh Token: {self.refresh_token}")  # 디버깅을 위해 출력
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.post(self.logout_url, {
            'refresh': self.refresh_token
        }, format='json')
        print("Logout response status code:", response.status_code)
        print("Logout response data:", response.data)  # 디버깅을 위해 응답 데이터를 출력합니다.
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)