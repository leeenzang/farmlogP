from django.urls import path
from .views import FarmLogListCreateView, FarmLogListView, CalculateLunarDateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

urlpatterns = [
    path('logs/', FarmLogListCreateView.as_view(), name='farmlog-list-create'),
    path('logsview/', FarmLogListView.as_view(), name='farmlog-list-view'),
    path('calculate-lunar-date/', CalculateLunarDateView.as_view(), name='calculate-lunar-date'),
] 