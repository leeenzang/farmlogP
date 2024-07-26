from django.urls import path
from .views import FarmLogListCreateView, FarmLogListView, CalculateLunarDateView, FarmLogDetailView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

urlpatterns = [
    path('logs/', FarmLogListCreateView.as_view(), name='farmlog-list-create'),
    path('logsview/', FarmLogListView.as_view(), name='farmlog-list-view'),
    path('calculate-lunar-date/', CalculateLunarDateView.as_view(), name='calculate-lunar-date'),
    path('logs/<int:pk>/', FarmLogDetailView.as_view(), name='farmlog-detail'),  # 개별 로그 조회 URL 패턴 추가

] 