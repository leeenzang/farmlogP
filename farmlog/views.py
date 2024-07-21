from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import FarmLog
from .serializers import FarmLogSerializer

class FarmLogListCreateView(generics.ListCreateAPIView):
    queryset = FarmLog.objects.all()
    serializer_class = FarmLogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)