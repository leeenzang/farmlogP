from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import FarmLog
from .serializers import FarmLogSerializer
from rest_framework.views import APIView
from rest_framework import status
from common.lunar_api import get_lunar_date
from django.utils.dateparse import parse_date  # Import parse_date
from rest_framework.response import Response
import xml.etree.ElementTree as ET
from common.lunar_api import get_lunar_date

# 기록하기
class FarmLogListCreateView(generics.ListCreateAPIView):
    queryset = FarmLog.objects.all()
    serializer_class = FarmLogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        date = serializer.validated_data['date']
        lunar_date = get_lunar_date(date.year, date.month, date.day)
        lunar_date_str = f"{lunar_date['lunar_year']}-{lunar_date['lunar_month']}-{lunar_date['lunar_day']}"
        serializer.save(user=self.request.user, lunar_date=lunar_date_str)
    
    def get_lunar_date(self, year, month, day):
        return get_lunar_date(year, month, day)

        
# 기록보기
class FarmLogListView(generics.ListAPIView):
    queryset = FarmLog.objects.all()
    serializer_class = FarmLogSerializer
    permission_classes = [IsAuthenticated]

class CalculateLunarDateView(APIView):
    def post(self, request, *args, **kwargs):
        date_str = request.data.get('date')
        if not date_str:
            return Response({'error': 'Date is required'}, status=status.HTTP_400_BAD_REQUEST)

        solar_date = parse_date(date_str)
        if not solar_date:
            return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

        lunar_date = get_lunar_date(solar_date.year, solar_date.month, solar_date.day)
        lunar_date_str = f"{lunar_date['lunar_year']}-{lunar_date['lunar_month']}-{lunar_date['lunar_day']}"
        return Response({'lunar_date': lunar_date_str}, status=status.HTTP_200_OK)