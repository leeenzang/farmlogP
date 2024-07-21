from django.urls import path
from .views import FarmLogListCreateView

urlpatterns = [
    path('logs/', FarmLogListCreateView.as_view(), name='farmlog-list-create'),
]