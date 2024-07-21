from django.urls import path
from .views import FarmLogListCreateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

urlpatterns = [
    path('logs/', FarmLogListCreateView.as_view(), name='farmlog-list-create'),
]